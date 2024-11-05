import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlices';
import logo from '../../assets/img/argentBankLogo.webp';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const username = useSelector((state) => state.user.username);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/sign-in', { replace: true });
  };

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link to="/user" className="main-nav-item" aria-label="User Profile">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
            {username}
          </Link>
          <Link to="/sign-in" className="main-nav-item" onClick={handleSignOut} aria-label="Sign Out">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            Sign Out
          </Link>
        </>
      );
    } else {
      return (
        <Link to="/sign-in" className="main-nav-item" aria-label="Sign In">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          Sign In
        </Link>
      );
    }
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="RightPart">
        {renderAuthLinks()}
      </div>
    </nav>
  );
};

export default Header;
