// src/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";
import loginImage from '../components/images/pic3.jpg'; // Make sure this image exists

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to role-based dashboard
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (isLoggedIn && currentUser) {
      navigate(`/${currentUser.role}`, { replace: true });
    }
  }, [navigate]);

  // Backend login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token); // store JWT
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        navigate(`/${data.user.role}`, { replace: true });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src={loginImage} alt="Fitness" />
        </div>
        <div className="login-form-section">
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Fitness Login</h1>

            {error && <p className="error-text">{error}</p>}

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

            <button type="submit">Login</button>

            <p className="note-text">
              New user? <Link to="/signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
