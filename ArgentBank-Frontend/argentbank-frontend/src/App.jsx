import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import UserProfileEdit from './components/UserProfileEdit/UserProfileEdit';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/user"
          element={isAuthenticated ? <Profile /> : <Navigate to="/sign-in" replace />}
        />
        <Route
          path="/edit-profile"
          element={isAuthenticated ? <UserProfileEdit /> : <Navigate to="/sign-in" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
