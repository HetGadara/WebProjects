import React, { useState, useCallback } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';

const users = {};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = useCallback(() => {
    if (users[email]) {
      users[email].password = newPassword;
      alert('Password Reset Successful');
    } else {
      alert('Email not found');
    }
  }, [email, newPassword]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Reset Password</h2>
        <TEInput
          type='email'
          label='Email address'
          size='lg'
          className='mb-6'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TEInput
          type='password'
          label='New Password'
          size='lg'
          className='mb-6'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TERipple rippleColor='light' className='w-full'>
          <button
            type='button'
            className='inline-block w-full rounded bg-red-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white hover:bg-red-700 transition duration-200'
            onClick={handleReset}
          >
            Reset
          </button>
        </TERipple>
      </div>
    </div>
  );
};

export default ResetPassword;
