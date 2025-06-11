// src/components/Member-panel/Header1.jsx
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import '../../styles/Layout.css'; // Optional

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FiMenu />
      </button>
      <h2>Member Panel</h2>
    </header>
  );
};

export default Header;
