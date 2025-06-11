import React from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import '../styles/Header.css';

const Header = ({ toggleSidebar }) => (
  <header className="header">
    <div className="header-left">
      <button onClick={toggleSidebar} className="menu-btn">
        <FiMenu size={24} />
      </button>
      <h1 className="header-title">Member Panel</h1>
    </div>
    <div className="header-right">
      <FiUser className="header-icon" size={20} />
    </div>
  </header>
);

export default Header;
