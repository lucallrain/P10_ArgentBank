import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import logo from '../../assets/img/argentBankLogo.webp';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, userName } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/sign-in', { replace: true });
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="RightPart">
        {isLoggedIn ? (
          <>
            <Link to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link to="/sign-in" className="main-nav-item" onClick={handleSignOut}>
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
