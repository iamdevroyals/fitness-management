import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import '../styles/Header.css'; // Link to external CSS

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="menu-btn">
          <FiMenu size={24} />
        </button>
        <h1 className="header-title">Admin Panel</h1>
      </div>

      <div className="header-right">
        <FiBell className="header-icon" size={20} />
        <div className="header-avatar">
          <FiUser size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;
