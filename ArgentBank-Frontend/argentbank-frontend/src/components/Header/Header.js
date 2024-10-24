import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.webp';

const Header = ({ isLoggedIn, userName, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); 
    navigate('/sign-in'); 
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn && location.pathname === '/user' ? ( 
          <>
            <Link to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link to="/" className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
