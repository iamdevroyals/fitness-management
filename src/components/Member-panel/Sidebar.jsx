import React from 'react';
import {
  FiHome,
  FiCalendar,
  FiBarChart2,
  FiLogOut,
} from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // Keeping the original import path

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-logo">
          {isOpen ? <h2>Fitness Member</h2> : <span className="logo-mini">F</span>}
        </div>

        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/member"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <FiHome className="sidebar-icon" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/member/classes"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <FiCalendar className="sidebar-icon" />
              {isOpen && <span>My Classes</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/member/workouts"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <FiBarChart2 className="sidebar-icon" />
              {isOpen && <span>My Workouts</span>}
            </NavLink>
          </li>
        </ul>

        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <FiLogOut className="sidebar-icon" />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
