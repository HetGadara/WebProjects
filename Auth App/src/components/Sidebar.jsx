import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Typography, IconButton, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SidebarContext } from './SidebarContext';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const { isAuthenticated } = useAuth();

  const handleToggleSidebar = () => {
    setSidebarOpen((prevOpen) => !prevOpen);
  };

  if (!isAuthenticated) {
    return null;
  }
  return (
    <Box
      sx={{
        width: sidebarOpen ? 300 : 60,
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: 'white',
        position: 'fixed',
        overflow: 'hidden',
        transition: 'width 0.3s ease',
        boxShadow: 3,
      }}
    >
      <Grid
        container
        sx={{
          width: '100%',
        }}
        mt={sidebarOpen ? 10 : 2}
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid item xs p={1}>
          <Typography
            variant='h6'
            sx={{
              visibility: sidebarOpen ? 'visible' : 'hidden',
            }}
          >
            My Application
          </Typography>
        </Grid>

        <Grid item>
          <IconButton color='inherit' onClick={handleToggleSidebar}>
            {sidebarOpen ? (
              <DoubleArrowIcon sx={{ ml: 1, transform: 'rotate(180deg)' }} />
            ) : (
              <DoubleArrowIcon sx={{ ml: 1 }} />
            )}
          </IconButton>
        </Grid>
      </Grid>

      <List>
        <ListItem button component={Link} to='/dashboard'>
          <DashboardIcon sx={{ color: 'white' }} />
          {sidebarOpen && <ListItemText primary='Dashboard' sx={{ color: 'white', ml: 1 }} />}
        </ListItem>
        <Divider light />
        <ListItem button component={Link} to='/task'>
          <GroupAddIcon sx={{ color: 'white' }} />
          {sidebarOpen && <ListItemText primary='Add Student Info' sx={{ color: 'white', ml: 1 }} />}
        </ListItem>
      </List>
      {/* <div style={{ display: 'flex' }}>
        <Sidebar isOpen={sidebarOpen} />
      </div> */}
      {/* <Grid
        conatiner
        maxWidth='lg'
        sx={{
          marginLeft: sidebarOpen ? '500px' : 'auto',
          paddingLeft: '20px',
          transition: 'margin-left 0.3s ease',
        }}
      /> */}
    </Box>
  );
};

export default Sidebar;
