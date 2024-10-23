import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setIsLoggedIn, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(null);
    console.log('Tentative de connexion avec :', { username, password });

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();
      console.log('Réponse reçue complète :', data);
      console.log('Contenu de body :', data.body);


      if (response.ok) {
        console.log('Connexion réussie');

        const token = data.body.token; 

        if (token) {
          localStorage.setItem('token', token);
          console.log('Token stocké :', localStorage.getItem('token'));
          setIsLoggedIn(true);
          setUserName(username);
          navigate('/user'); 
        } else {
          console.error('Erreur : le token est manquant dans la réponse.');
          setError('Le token est manquant dans la réponse du serveur.');
        }
      } else {
        console.error('Erreur de connexion :', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    }
  };


  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
