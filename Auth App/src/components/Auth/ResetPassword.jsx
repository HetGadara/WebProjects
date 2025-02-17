import React, { useState, useCallback } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = useCallback(() => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
      users[email].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password Reset Successful');

      setEmail('');
      setNewPassword('');
      setConfirmPassword('');

      navigate('/login');
    } else {
      alert('Email not found');
    }
  }, [email, newPassword, confirmPassword, navigate]);

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
              Reset Password
            </Typography>
            <form noValidate>
              <TextField
                label='Email address'
                type='email'
                fullWidth
                variant='outlined'
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label='New Password'
                type='password'
                fullWidth
                variant='outlined'
                margin='normal'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label='Confirm Password'
                type='password'
                fullWidth
                variant='outlined'
                margin='normal'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <Typography color='error' variant='body2' align='center'>
                  {error}
                </Typography>
              )}
              <Button variant='contained' color='error' fullWidth onClick={handleReset} style={{ marginTop: '16px' }}>
                Reset
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
