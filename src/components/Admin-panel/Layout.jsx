// src/components/Admin-panel/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="content-area">
          <Outlet /> {/* All child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
