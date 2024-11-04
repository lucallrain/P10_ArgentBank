import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { updateUsername } from '../../redux/slices/userSlices'; 
import Account from '../Account/Account';
import './UserProfileEdit.css';

const UserProfileEdit = ({ updateUserName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(location.state?.profile || {
    userName: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(!location.state?.profile);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!location.state?.profile) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserData(data.body);
            setIsLoading(false);
          } else {
            console.error('Erreur lors de la récupération des données utilisateur', data.message);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur', error);
        }
      };
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [location.state?.profile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userData.userName })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateUsername(userData.userName)); 
        updateUserName(userData.userName); // Mettre à jour userName dans App
        navigate('/user'); 
      } else {
        console.error('Erreur lors de la mise à jour du username', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du username', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="user_profile__page">
      <div className="user-profile-edit">
        <h2>Edit User Info</h2>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group fixed">
          <label>First Name</label>
          <input type="text" value={userData.firstName} readOnly />
        </div>
        <div className="form-group fixed">
          <label>Last Name</label>
          <input type="text" value={userData.lastName} readOnly />
        </div>
        
        <div className="button-group">
          <button className="save-button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button className="cancel-button" onClick={() => navigate('/user')}>Cancel</button>
        </div>
      </div>
      <div className="Account_Information">
        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </div>
    </div>
  );
};

export default UserProfileEdit;
