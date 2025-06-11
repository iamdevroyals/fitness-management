// src/auth/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Ensure you have the styling applied

const Signup = () => {
  const navigate = useNavigate();

  // State variables
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]       = useState('member'); // default
  const [error, setError]     = useState('');

 const handleSignup = async (e) => {
  e.preventDefault();
  setError('');

  try {
   const response = await fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password, role }),
});


    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Signup failed');
    } else {
      navigate('/login');
    }
  } catch (error) {
    setError('Something went wrong');
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Fitness Signup</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>

        <p className="note-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
