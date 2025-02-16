import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';

const users = {};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = useCallback(() => {
    users[email] = { password, otp: Math.floor(1000 + Math.random() * 9000) };
    localStorage.setItem('user', JSON.stringify(users[email]));
    alert(`OTP sent: ${users[email].otp}`);
    navigate('/verify-otp');
  }, [email, password, navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Signup</h2>
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
          label='Password'
          size='lg'
          className='mb-6'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TERipple rippleColor='light' className='w-full'>
          <button
            type='button'
            className='inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white hover:bg-blue-700 transition duration-200'
            onClick={handleSignup}
          >
            Signup
          </button>
        </TERipple>
        <Link to='/login' className='block text-center text-blue-600 mt-4 hover:underline'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
