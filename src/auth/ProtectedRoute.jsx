// src/auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  } catch (err) {
    console.error('Error parsing currentUser:', err);
  }

  // If not logged in or user info missing, redirect to login
  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user role doesn't match the required role, redirect to their own dashboard
  if (role && currentUser.role !== role) {
    return <Navigate to={`/${currentUser.role}-dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
