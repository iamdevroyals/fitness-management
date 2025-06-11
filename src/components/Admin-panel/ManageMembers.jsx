import React, { useState } from 'react';
import '../styles/ManageMembers.css';

const ManageMembers = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      membership: 'Premium',
      joined: '2025-01-10',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    membership: '',
    joined: '',
  });

  const handleOpenAddForm = () => {
    setFormData({ name: '', email: '', membership: '', joined: '' });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditClick = (index) => {
    setFormData({ ...members[index] });
    setEditIndex(index);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      const updated = [...members];
      updated[editIndex] = { ...formData, id: updated[editIndex].id };
      setMembers(updated);
    } else {
      setMembers([...members, { ...formData, id: members.length + 1 }]);
    }
    setShowModal(false);
    setFormData({ name: '', email: '', membership: '', joined: '' });
    setIsEditMode(false);
  };

  return (
    <div className="members-container">
      <h2 className="members-title">Manage Members</h2>
      <p className="members-subtitle">View, add, edit, or remove gym members.</p>

      <div className="members-actions">
        <button className="add-member-btn" onClick={handleOpenAddForm}>
          + Add Member
        </button>
      </div>

      <table className="members-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Membership Type</th>
            <th>Joined On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.membership}</td>
              <td>{member.joined}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditMode ? 'Edit Member' : 'Add New Member'}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Membership Type"
                value={formData.membership}
                onChange={(e) => setFormData({ ...formData, membership: e.target.value })}
                required
              />
              <input
                type="date"
                value={formData.joined}
                onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  {isEditMode ? 'Update' : 'Add'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
