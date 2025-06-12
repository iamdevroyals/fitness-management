// src/pages/WorkoutPlans.jsx
import React, { useState, useEffect } from 'react';
import '../styles/WorkoutPlans.css';

const WorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    level: '',
    assignedTo: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('workoutPlans');
    if (stored) {
      setPlans(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem('workoutPlans', JSON.stringify(data));
    setPlans(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      const updated = plans.map((plan) =>
        plan.id === editId ? { ...plan, ...formData } : plan
      );
      saveToStorage(updated);
    } else {
      const newPlan = {
        id: Date.now(),
        ...formData
      };
      saveToStorage([...plans, newPlan]);
    }

    setShowModal(false);
    setEditId(null);
    setFormData({ name: '', duration: '', level: '', assignedTo: '' });
  };

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name,
      duration: plan.duration,
      level: plan.level,
      assignedTo: plan.assignedTo
    });
    setEditId(plan.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      const updated = plans.filter((plan) => plan.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <div className="plans-container">
      <h2 className="plans-title">Workout Plans</h2>
      <p className="plans-subtitle">Create and assign customized workout plans for your gym members.</p>

      <div className="plans-actions">
        <button className="add-plan-btn" onClick={() => setShowModal(true)}>+ Add Workout Plan</button>
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
          {plans.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{plan.name}</td>
              <td>{plan.duration}</td>
              <td>{plan.level}</td>
              <td>{plan.assignedTo}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(plan)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(plan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId !== null ? 'Edit Workout Plan' : 'Add New Workout Plan'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Plan Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="duration" placeholder="Duration (e.g. 4 Weeks)" value={formData.duration} onChange={handleChange} required />
              <input type="text" name="level" placeholder="Level (e.g. Beginner)" value={formData.level} onChange={handleChange} required />
              <input type="text" name="assignedTo" placeholder="Assigned To (e.g. 10 Members)" value={formData.assignedTo} onChange={handleChange} required />
              <div className="modal-actions">
                <button type="submit">{editId !== null ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => { setShowModal(false); setEditId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;
