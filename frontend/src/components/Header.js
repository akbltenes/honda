import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';
import hondaLogo from '../assets/honda-logo.svg';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-button" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/social-media-plan" className="header-brand">
            <img src={hondaLogo} alt="Honda Logo" className="header-logo" />
            <div className="brand-text">
              <div>HONDA PLAZA</div>
              <div>ÖZMERT</div>
            </div>
          </Link>
        </div>
        <div className="header-right">
          <div className="user-info">
            {user && <span>{user.username}</span>}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 