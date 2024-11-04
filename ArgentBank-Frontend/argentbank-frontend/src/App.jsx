import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import UserProfileEdit from './components/UserProfileEdit/UserProfileEdit';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const updateUserName = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  return (
    <Router>
      <Header userName={userName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn updateUserName={updateUserName} />} />
        <Route
          path="/user"
          element={localStorage.getItem('token') ? <Profile /> : <Navigate to="/sign-in" replace />}
        />
        <Route
          path="/edit-profile"
          element={localStorage.getItem('token') ? (
            <UserProfileEdit updateUserName={updateUserName} />
          ) : (
            <Navigate to="/sign-in" replace />
          )}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
