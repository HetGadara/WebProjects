import React, { useState, useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  createTheme,
  keyframes,
  ThemeProvider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleReset = useCallback(() => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
      users[email].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Password Reset Successful');

      setEmail('');
      setNewPassword('');
      setConfirmPassword('');

      navigate('/login');
    } else {
      toast.error('Email not found');
    }
  }, [email, newPassword, confirmPassword, navigate]);

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
              <Typography variant='h5' align='center' gutterBottom>
                Reset Password
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
                    border: 'none',
                  }}
                />
                <TextField
                  placeholder='New Password'
                  type={showNewPassword ? 'text' : 'password'}
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                          aria-label={showNewPassword ? 'hide the password' : 'display the password'}
                          onClick={handleShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseDownPassword}
                          edge='end'
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                <TextField
                  placeholder='Confirm Password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                          aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                          onClick={handleShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseDownPassword}
                          edge='end'
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                {error && (
                  <Typography color='error' variant='body2' align='center'>
                    {error}
                  </Typography>
                )}
                <Button
                  variant='contained'
                  color='error'
                  fullWidth
                  onClick={handleReset}
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
                  Reset
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ResetPassword;
