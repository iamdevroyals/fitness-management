// src/pages/ManageClasses.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ManageClasses.css';
import { useNavigate } from 'react-router-dom';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    duration: '',
    capacity: '',
    instructor: ''
  });
  const [editId, setEditId] = useState(null);

const fetchClasses = async () => {
  const token = localStorage.getItem('token'); // Get the auth token
  const res = await fetch('http://localhost:5000/api/admin/classes', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }
  
  const data = await res.json();
  if (data.success) setClasses(data.data);
};

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(
      editId 
        ? `http://localhost:5000/api/admin/classes/${editId}`
        : 'http://localhost:5000/api/admin/classes',
      {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          schedule: new Date(formData.schedule).toISOString()
        })
      }
    );

    // First check if response is OK
    if (!response.ok) {
      // Try to parse error as JSON, fallback to text
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: await response.text() };
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      // Success case
      fetchClasses();
      setShowModal(false);
      setFormData({
        name: '', description: '', schedule: '', 
        duration: '', capacity: '', instructor: ''
      });
      setEditId(null);
    }
  } catch (error) {
    console.error('API Error:', error);
    alert(error.message || 'Failed to save class');
  }
};

  const handleEdit = (cls) => {
    setFormData({
      name: cls.name,
      description: cls.description || '',
      schedule: new Date(cls.schedule).toISOString().slice(0, 16),
      duration: cls.duration,
      capacity: cls.capacity,
      instructor: cls.instructor
    });
    setEditId(cls._id);
    setShowModal(true);
  };

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this class?')) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/classes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete class');
      }
      
      const result = await res.json();
      if (result.success) fetchClasses();
    } catch (err) {
      alert(err.message);
    }
  }
};

  return (
    <div className="classes-container">
      <h2 className="classes-title">Manage Classes</h2>
      <p className="classes-subtitle">Add, edit, or remove fitness classes and manage their schedules.</p>

      <div className="classes-actions">
        <button className="add-class-btn" onClick={() => setShowModal(true)}>+ Add Class</button>
      </div>

      <table className="classes-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Trainer</th>
            <th>Time</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, idx) => (
            <tr key={cls._id}>
              <td>{idx + 1}</td>
              <td>{cls.name}</td>
              <td>{cls.instructor}</td>
              <td>{new Date(cls.schedule).toLocaleString()}</td>
              <td>{cls.capacity}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(cls)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cls._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editId ? 'Edit Class' : 'Add Class'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Class Name" value={formData.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
              <input type="datetime-local" name="schedule" value={formData.schedule} onChange={handleChange} required />
              <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} required />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
              <input type="text" name="instructor" placeholder="Instructor Name" value={formData.instructor} onChange={handleChange} required />
              <div className="modal-actions">
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
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
