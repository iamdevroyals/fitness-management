import React from 'react';
import '../styles/Dashboard.css'; // Assuming you have a CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-welcome">Welcome to the Fitness Management System</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Members</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Active Classes</h3>
          <p>8</p>
        </div>
        <div className="card">
          <h3>Workout Plans</h3>
          <p>15</p>
        </div>
        <div className="card">
          <h3>Trainers</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
