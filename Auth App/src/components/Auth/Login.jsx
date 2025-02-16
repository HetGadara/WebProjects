import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import { useAuth } from '../../context/AuthContext';

const users = {};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = useCallback(() => {
    if (users[email] && users[email].password === password) {
      alert('Login Successful');
      login(users[email]); // Set the authenticated user
      navigate('/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  }, [email, password, navigate, login]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Login</h2>
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
            onClick={handleLogin}
          >
            Login
          </button>
        </TERipple>
        <Link to='/signup' className='block text-center text-blue-600 mt-4 hover:underline'>
          Don't have an account? Signup
        </Link>
        <Link to='/reset-password' className='block text-center text-red-600 mt-4 hover:underline'>
          Forgot Password? Reset
        </Link>
      </div>
    </div>
  );
};

export default Login;
