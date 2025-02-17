import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    const userEmail = Object.keys(users).find((email) => users[email].otp);
    const storedOTP = users[userEmail]?.otp;

    if (parseInt(otp) === storedOTP) {
      alert('OTP Verified!');
      navigate('/login');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{ minHeight: '100vh', background: 'linear-gradient(to right, #3b82f6, #9333ea)' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant='h5' align='center' gutterBottom>
              Verify OTP
            </Typography>
            <form noValidate>
              <TextField
                label='Enter OTP'
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                variant='contained'
                color='success'
                fullWidth
                onClick={handleVerify}
                style={{ marginTop: '16px' }}
              >
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VerifyOTP;
