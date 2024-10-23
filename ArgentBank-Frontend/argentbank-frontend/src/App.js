import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import useAuth from './components/useAuth/useAuth';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const { isLoggedIn, userName, setIsLoggedIn, setUserName } = useAuth();

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userName={userName} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
        />
        <Route
          path="/user"
          element={
            isLoggedIn ? (
              <Profile />
            ) : (
              <SignIn setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
