import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  keyframes,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, auth } = useAuth();

  // If the user is already logged in, redirect to the dashboard
  useEffect(() => {
    if (auth) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = useCallback(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
      toast.success('Login Successful');
      login(users[email]);
      navigate('/dashboard');
    } else {
      toast.error('Invalid Credentials');
    }
  }, [email, password, navigate, login]);

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
                Log in
              </Typography>
              <Typography
                variant='h6'
                align='center'
                gutterBottom
                style={{
                  color: '#ecf0f1',
                }}
              >
                Welcome To CodexWorld!👋
              </Typography>
              <form noValidate>
                <TextField
                  placeholder='Email address'
                  type='email'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  onClick={handleLogin}
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
                  Login
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
                Don't have an account?{' '}
                <a href='/signup' style={{ color: '#2980b9', textDecoration: 'none' }}>
                  Sign up
                </a>
              </Typography>

              <Typography
                variant='body2'
                align='center'
                style={{
                  marginTop: '12px',
                  color: '#ecf0f1',
                }}
              >
                Forgot Password?{' '}
                <a href='/reset-password' style={{ color: '#cf2b15', textDecoration: 'none' }}>
                  Reset
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
