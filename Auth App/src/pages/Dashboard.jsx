import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Grid, AppBar, Toolbar, Typography, Container, Card, CardContent, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StudentCard from '../components/StudentCard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2980b9',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f4f4f9',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  }, [logout, navigate]);

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const userEmail = Object.keys(users).find((email) => users[email].name);
  const userName = users[userEmail]?.name;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '90vh', backgroundColor: theme.palette.background.default }}>
        <AppBar position='fixed' sx={{ width: '100%', zIndex: 1300 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', padding: '10px' }}>
              <img
                src='/static/logo.png'
                alt='Logo'
                style={{
                  width: '150px',
                  height: 'auto',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to='/task' style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h6'
                  sx={{
                    color: 'white',
                    marginRight: 2,
                    '&:hover': {
                      color: theme.palette.secondary.main,
                      cursor: 'pointer',
                    },
                  }}
                >
                  Add Student Info
                </Typography>
              </Link>

              <Typography
                color='inherit'
                onClick={handleLogout}
                variant='h6'
                sx={{
                  textTransform: 'none',
                  padding: 0,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.secondary.main,
                    cursor: 'pointer',
                  },
                }}
              >
                Logout
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth='lg' sx={{ marginTop: '80px' }}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            spacing={3}
            sx={{ minHeight: 'calc(100vh - 80px)' }}
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant='h5' align='center' gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Welcome, {userName}!
                  </Typography>
                  <Typography variant='body1' align='center' sx={{ color: theme.palette.text.secondary }}>
                    You have successfully logged in. Explore the dashboard features and enjoy!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container spacing={2} justifyContent='center' alignItems='center'>
              {students.map((student) => (
                <Grid item key={student.id} xs={12} sm={6} md={4} lg={3}>
                  <StudentCard student={student} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
