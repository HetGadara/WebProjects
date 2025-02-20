import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './Auth/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-otp' element={<VerifyOTP />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='task' element={<Task />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
