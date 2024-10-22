import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const App = () => {
  return (
    <Router>
      <Header isLoggedIn={false} userName="Tony" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
