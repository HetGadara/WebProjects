import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  createTheme,
  keyframes,
  ThemeProvider,
} from '@mui/material';
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

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const userEmail = Object.keys(users).find((email) => users[email].otp);
  const userName = users[userEmail]?.name;

  useEffect(() => {
    document.getElementById('otp-0').focus();
  }, []);

  // Handle OTP
  const handleOtpChange = (e, index) => {
    let newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);

    if (e.target.value) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    const storedOTP = users[userEmail]?.otp;

    if (parseInt(otp.join('')) === storedOTP) {
      toast.success('OTP Verified!');
      navigate('/login');
    } else {
      toast.error('Invalid OTP');
    }
  };

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
          background: 'linear-gradient(120deg, #2c3e50 0%, #34495e 100%)', // Darker background
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
                OTP Verification
              </Typography>

              {userName && (
                <Typography
                  variant='body1'
                  align='center'
                  gutterBottom
                  style={{
                    color: '#ecf0f1',
                  }}
                >
                  Hi, {userName}
                </Typography>
              )}
              <Typography
                variant='body2'
                align='center'
                gutterBottom
                style={{
                  color: '#ecf0f1',
                }}
              >
                Enter the OTP sent to your browser in toster
              </Typography>
              <Box display='flex' justifyContent='center' alignItems='center' p={1} gap={2}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: 'center', fontSize: '24px' },
                    }}
                    variant='outlined'
                    type='text'
                    sx={{
                      width: '50px',
                      height: '50px',
                      fontSize: '24px',
                      marginBottom: '16px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '50px',
                        backgroundColor: '#ecf0f1',
                      },
                    }}
                  />
                ))}
              </Box>
              <Button
                variant='contained'
                color='success'
                fullWidth
                onClick={handleVerify}
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
                Verify
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default VerifyOTP;
