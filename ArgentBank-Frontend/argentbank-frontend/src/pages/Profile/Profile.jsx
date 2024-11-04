import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/slices/userSlices';
import Account from '../../components/Account/Account';
import './Profile.css';

const accounts = [
  { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
  { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
  { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" }
];

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.user.token);
  const { firstName, lastName, username } = useSelector((state) => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    username: state.user.username
  }));

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
      return;
    }

    if (!firstName || !lastName || !username) {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();

          if (response.ok) {
            dispatch(setUserProfile({
              username: data.body.userName,
              firstName: data.body.firstName,
              lastName: data.body.lastName,
            }));
          } else {
            console.error('Erreur lors de la récupération du profil:', data.message);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      };

      fetchProfile();
    }
  }, [token, firstName, lastName, username, navigate, dispatch]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}!</h1>
        <button className="edit-button" onClick={() => navigate('/edit-profile')}>
          Edit Name
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account 
          key={index} 
          title={account.title} 
          amount={account.amount} 
          description={account.description} 
        />
      ))}
    </main>
  );
};

export default Profile;
