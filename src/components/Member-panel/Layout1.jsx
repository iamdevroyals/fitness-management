// src/components/Member-panel/Layout1.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header1';
import Sidebar from './Sidebar';
import '../styles/Layout.css'; // Assuming you have a CSS file for styling

const MemberLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle state

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
