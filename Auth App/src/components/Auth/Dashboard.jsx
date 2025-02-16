import React, { useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, [logout]);

  return (
    <div className='flex flex-col h-screen'>
      <nav className='bg-blue-600 p-4 flex justify-between items-center shadow-lg'>
        <h2 className='text-white text-2xl font-bold'>Dashboard</h2>
        <button
          className='text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-200'
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <main className='flex-grow flex justify-center items-center bg-gray-100'>
        <h2 className='text-2xl font-bold text-gray-800'>Welcome to the Dashboard!</h2>
      </main>
    </div>
  );
};

export default Dashboard;
