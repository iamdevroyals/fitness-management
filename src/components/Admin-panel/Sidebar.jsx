// src/components/Admin-panel/Sidebar.jsx
import React from 'react';
import { FiHome, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'expanded open' : 'collapsed'}`}>
      {/* ✨ Optional close button for mobile */}
      <div className="sidebar-close-btn">
        <button onClick={toggleSidebar}>✖</button>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-logo">
          {isOpen ? <h1>Fitness Management</h1> : <span>F</span>}
        </div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/admin" className="sidebar-link" onClick={toggleSidebar}>
              <FiHome className="sidebar-icon" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/members" className="sidebar-link" onClick={toggleSidebar}>
              <FiUsers className="sidebar-icon" />
              {isOpen && <span>Manage Members</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/classes" className="sidebar-link" onClick={toggleSidebar}>
              <FiSettings className="sidebar-icon" />
              {isOpen && <span>Manage Classes</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/workouts" className="sidebar-link" onClick={toggleSidebar}>
              <FiSettings className="sidebar-icon" />
              {isOpen && <span>Workout Plans</span>}
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <FiLogOut className="sidebar-icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
