import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Menü</h3>
        <button className="close-button" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/social-media-plan" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <i className="fab fa-instagram"></i>
              Instagram Planı
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/library" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <i className="fas fa-photo-video"></i>
              Kütüphane
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 