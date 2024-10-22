import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.webp';

const Header = ({ isLoggedIn, userName }) => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link to="/" className="main-nav-item">
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
