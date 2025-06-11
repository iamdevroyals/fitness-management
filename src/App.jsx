// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './components/Admin-panel/Layout';
import Dashboard from './components/Admin-panel/Dashboard';
import ManageMembers from './components/Admin-panel/ManageMembers';
import ManageClasses from './components/Admin-panel/ManageClasses';
import WorkoutPlans from './components/Admin-panel/WorkoutPlans';

import MemberLayout from './components/Member-panel/Layout1';
import MemberDashboard from './components/Member-panel/Dashboard';
import MemberClasses from './components/Member-panel/MemberClasses';       // ✅ Add this import
import MemberWorkouts from './components/Member-panel/MemberWorkouts';     // ✅ Add this import

import Login from './auth/Login';
import Signup from './auth/Signup';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isLoggedIn && currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="members" element={<ManageMembers />} />
          <Route path="classes" element={<ManageClasses />} />
          <Route path="workouts" element={<WorkoutPlans />} />
        </Route>

        {/* Member Routes */}
        <Route
          path="/member"
          element={
            <ProtectedRoute role="member">
              <MemberLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="classes" element={<MemberClasses />} />     {/* ✅ Added */}
          <Route path="workouts" element={<MemberWorkouts />} />   {/* ✅ Added */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
