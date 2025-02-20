import React, { useState, useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2980b9',
    },
    secondary: {
      main: '#ecf0f1',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handle Signup and generate OTP
  const handleSignup = useCallback(() => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const userData = { name, password, otp };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};

    existingUsers[email] = userData;
    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast.success(`OTP sent: ${otp}`);
    navigate('/verify-otp');
  }, [name, email, password, navigate]);

  const slideInFromTop = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #2c3e50 0%, #34495e 100%)',
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #2d3436, #34495e)',
              animation: `${slideInFromTop} 0.8s ease-out`,
            }}
          >
            <CardContent>
              <Typography
                variant='h4'
                align='center'
                gutterBottom
                style={{
                  fontWeight: 'bold',
                  color: '#ecf0f1',
                }}
              >
                Sign in
              </Typography>
              <Typography
                variant='h6'
                align='center'
                gutterBottom
                style={{
                  color: '#ecf0f1',
                }}
              >
                Please Sign-in to your account and start the adventure ous journey
              </Typography>
              <form noValidate>
                <TextField
                  placeholder='Full Name'
                  type='text'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    borderRadius: '20px',
                    marginBottom: '16px',
                    backgroundColor: '#ecf0f1',
                  }}
                />

                <TextField
                  placeholder='Email Address'
                  type='email'
                  fullWidth
                  margin='normal'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant='outlined'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailRoundedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    borderRadius: '20px',
                    marginBottom: '16px',
                    backgroundColor: '#ecf0f1',
                    border: 'none',
                  }}
                />
                <TextField
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <KeyRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label={showPassword ? 'hide the password' : 'display the password'}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: '20px',
                    marginBottom: '16px',
                    backgroundColor: '#ecf0f1',
                  }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={handleSignup}
                  sx={{
                    borderRadius: '20px',
                    padding: '12px',
                    fontSize: '16px',
                    backgroundColor: '#2980b9',
                    '&:hover': {
                      backgroundColor: '#1f6396',
                    },
                  }}
                >
                  Signup
                </Button>
              </form>
              <Typography
                variant='body2'
                align='center'
                style={{
                  marginTop: '12px',
                  color: '#ecf0f1',
                }}
              >
                Already have an account?{' '}
                <a href='/login' style={{ color: '#2980b9', textDecoration: 'none' }}>
                  Login
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
