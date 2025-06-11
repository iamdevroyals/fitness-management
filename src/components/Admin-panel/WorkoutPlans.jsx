import React from 'react';
import '../styles/WorkoutPlans.css';

const WorkoutPlans = () => {
  return (
    <div className="plans-container">
      <h2 className="plans-title">Workout Plans</h2>
      <p className="plans-subtitle">Create and assign customized workout plans for your gym members.</p>

      <div className="plans-actions">
        <button className="add-plan-btn">+ Add Workout Plan</button>
      </div>

      <table className="plans-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Plan Name</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Beginner Full Body</td>
            <td>4 Weeks</td>
            <td>Beginner</td>
            <td>10 Members</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
          {/* Add more plan rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutPlans;
