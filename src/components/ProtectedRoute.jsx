import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user is an admin (email ends with @admin.com)
  if (!user.email?.endsWith('@admin.com')) {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
