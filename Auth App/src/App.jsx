import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import VerifyOTP from './components/Auth/VerifyOTP';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Auth/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';

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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
