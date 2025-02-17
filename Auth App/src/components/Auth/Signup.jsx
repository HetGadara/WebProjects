import React, { useState, useCallback } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = useCallback(() => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const userData = { name, password, otp };
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    existingUsers[email] = userData;
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert(`OTP sent: ${otp}`);
    navigate('/verify-otp');
  }, [name, email, password, navigate]);

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
              Signup
            </Typography>
            <form noValidate>
              <TextField
                label='Name'
                type='text'
                fullWidth
                variant='outlined'
                margin='normal'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label='Email address'
                type='email'
                fullWidth
                variant='outlined'
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
                margin='normal'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSignup}
                style={{ marginTop: '16px' }}
              >
                Signup
              </Button>
            </form>
            <Typography variant='body2' align='center' style={{ marginTop: '12px' }}>
              Already have an account?{' '}
              <a href='/login' style={{ color: '#3f51b5' }}>
                Login
              </a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
