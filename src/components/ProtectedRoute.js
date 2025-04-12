import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserData } from '../api/auth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
      setAuthenticated(false);
    }
  }, []);

  if (loading) {
    return <Loader loading={loading} />; // You can replace this with a proper loading component
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 