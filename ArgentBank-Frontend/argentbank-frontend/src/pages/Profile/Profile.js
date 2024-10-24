import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../../components/Account/Account';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token')?.trim();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!token) {
      console.error('Token is missing');
      return;
    }

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
          setProfile(data.body);
        } else {
          console.error('Erreur lors de la récupération du profil:', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEditClick = () => {
    navigate('/edit-profile', { state: { profile, } });
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
        <button className="edit-button" onClick={handleEditClick}>
          Edit Name
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
  );
};

export default Profile;
