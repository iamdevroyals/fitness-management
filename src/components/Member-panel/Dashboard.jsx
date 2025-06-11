import React from 'react';
import '../styles/Dashboard1.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome Back, Member! 💪</h2>
      <p>Select an option from the sidebar to manage your classes and workouts.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Classes Enrolled</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Completed Workouts</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Upcoming Sessions</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
