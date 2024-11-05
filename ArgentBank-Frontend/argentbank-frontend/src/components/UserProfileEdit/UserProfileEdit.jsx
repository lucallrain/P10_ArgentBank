import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { setUsername } from '../../redux/slices/userSlices';
import Account from '../Account/Account';
import './UserProfileEdit.css';

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const [newUsername, setNewUsername] = useState(username);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!username && token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            dispatch(setUsername(data.body.userName));
          } else {
            console.error('Erreur lors de la récupération des données utilisateur', data.message);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur', error);
        }
      };
      fetchUserData();
    }
  }, [username, token, dispatch]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: newUsername })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUsername(newUsername));
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSaving) {
      handleSave();
    }
  };

  return (
    <div className="user_profile__page">
      <div className="user-profile-edit">
        <h2>Edit User Info</h2>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form-group fixed">
          <label>First Name</label>
          <input type="text" value={firstName} readOnly />
        </div>
        <div className="form-group fixed">
          <label>Last Name</label>
          <input type="text" value={lastName} readOnly />
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
