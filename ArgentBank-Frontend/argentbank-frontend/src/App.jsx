import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import UserProfileEdit from './components/UserProfileEdit/UserProfileEdit';
import { login } from './redux/slices/authSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userName } = useSelector((state) => state.auth);

  const handleLogin = (userName) => {
    dispatch(login({ userName }));
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userName={userName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
        <Route
          path="/user"
          element={isLoggedIn ? <Profile /> : <Navigate to="/sign-in" replace />}
        />
        <Route
          path="/edit-profile"
          element={isLoggedIn ? <UserProfileEdit /> : <Navigate to="/sign-in" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
