import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = useCallback(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check password matches
    if (users[email] && users[email].password === password) {
      alert('Login Successful');
      login(users[email]);
      navigate('/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  }, [email, password, navigate, login]);

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
              Login
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
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
                margin='normal'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant='contained' color='primary' fullWidth onClick={handleLogin} style={{ marginTop: '16px' }}>
                Login
              </Button>
            </form>
            <Link to='/signup' style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
              <Typography variant='body2' color='primary'>
                Don't have an account? Signup
              </Typography>
            </Link>
            <Link to='/reset-password' style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
              <Typography variant='body2' color='error'>
                Forgot Password? Reset
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
