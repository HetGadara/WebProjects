import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './components/SidebarContext';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Sidebar />
          <Routes>
            {/* Public Routes */}
            <Route path='/signup' element={<PublicRoute />}>
              <Route index element={<Signup />} />
            </Route>
            <Route path='/verify-otp' element={<PublicRoute />}>
              <Route index element={<VerifyOTP />} />
            </Route>
            <Route path='/login' element={<PublicRoute />}>
              <Route index element={<Login />} />
            </Route>
            <Route path='/reset-password' element={<PublicRoute />}>
              <Route index element={<ResetPassword />} />
            </Route>
            <Route path='/' element={<PublicRoute />}>
              <Route index element={<Signup />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/task' element={<Task />} />
            </Route>
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;
