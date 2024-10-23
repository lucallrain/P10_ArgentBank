import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
            setUserName(data.body.userName);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      };
      fetchProfile();
    }
  }, []);

  return { isLoggedIn, userName, setIsLoggedIn, setUserName };
};

export default useAuth;
