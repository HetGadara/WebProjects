import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem('user')) || {}, []);

  const handleVerify = () => {
    if (parseInt(otp) === storedUser.otp) {
      alert('OTP Verified!');
      navigate('/login');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Verify OTP</h2>
        <TEInput
          type='text'
          label='Enter OTP'
          size='lg'
          className='mb-6'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <TERipple rippleColor='light' className='w-full'>
          <button
            type='button'
            className='inline-block w-full rounded bg-green-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white hover:bg-green-700 transition duration-200'
            onClick={handleVerify}
          >
            Verify
          </button>
        </TERipple>
      </div>
    </div>
  );
};

export default VerifyOTP;
