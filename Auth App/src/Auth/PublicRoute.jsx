import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to='/dashboard' />;
  }

  return <Outlet />;
};

export default PublicRoute;
