// src/pages/ManageClasses.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ManageClasses.css';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    duration: '',
    capacity: '',
    instructor: ''
  });

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('classes');
    if (stored) {
      setClasses(JSON.parse(stored));
    }
  }, []);

  // Save data to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem('classes', JSON.stringify(data));
    setClasses(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      const updated = classes.map((cls) =>
        cls.id === editId ? { ...cls, ...formData } : cls
      );
      saveToStorage(updated);
    } else {
      const newClass = {
        id: Date.now(),
        ...formData
      };
      saveToStorage([...classes, newClass]);
    }

    setShowModal(false);
    setEditId(null);
    setFormData({
      name: '',
      description: '',
      schedule: '',
      duration: '',
      capacity: '',
      instructor: ''
    });
  };

  const handleEdit = (cls) => {
    setFormData({
      name: cls.name,
      description: cls.description,
      schedule: cls.schedule,
      duration: cls.duration,
      capacity: cls.capacity,
      instructor: cls.instructor
    });
    setEditId(cls.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updated = classes.filter((cls) => cls.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <div className="classes-container">
      <h2>Manage Classes</h2>
      <p>Add, edit or delete fitness classes. Data is stored locally.</p>
      <div className="classes-actions">
        <button onClick={() => setShowModal(true)}>+ Add Class</button>
      </div>

      <table className="classes-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Instructor</th>
            <th>Time</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, idx) => (
            <tr key={cls.id}>
              <td>{idx + 1}</td>
              <td>{cls.name}</td>
              <td>{cls.instructor}</td>
              <td>{new Date(cls.schedule).toLocaleString()}</td>
              <td>{cls.capacity}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(cls)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cls.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId !== null ? 'Edit Class' : 'Add New Class'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Class Name" value={formData.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
              <input type="datetime-local" name="schedule" value={formData.schedule} onChange={handleChange} required />
              <input type="number" name="duration" placeholder="Duration (mins)" value={formData.duration} onChange={handleChange} required />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
              <input type="text" name="instructor" placeholder="Instructor" value={formData.instructor} onChange={handleChange} required />
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

export default ManageClasses;
