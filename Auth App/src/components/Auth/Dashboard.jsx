import React, { useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Grid, AppBar, Toolbar, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  }, [logout, navigate]);

  const userData = JSON.parse(localStorage.getItem('user'));
  const name = userData ? userData.name : 'Guest';

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth='lg' style={{ marginTop: '32px' }}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          spacing={3}
          style={{ minHeight: 'calc(100vh - 64px)' }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant='h5' align='center' gutterBottom>
                  Welcome, {name}!
                </Typography>
                <Typography variant='body1' align='center'>
                  You have successfully logged in. Explore the dashboard features.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
