import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Container, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StudentCard from '../components/StudentCard';
import Navbar from '../components/Navbar';
import { SidebarContext } from '../components/SidebarContext';

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
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const userEmail = Object.keys(users).find((email) => users[email].name);
  const userName = users[userEmail]?.name;
  const { sidebarOpen } = useContext(SidebarContext);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <Navbar />
        <Container
          maxWidth='lg'
          sx={{
            marginLeft: sidebarOpen ? '500px' : 'auto',
            paddingLeft: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
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
