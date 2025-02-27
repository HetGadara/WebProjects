import React, { useCallback, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, MenuItem, Divider, Menu, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
    setIsProfileMenuOpen(true);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  }, [logout, navigate]);

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const userEmail = Object.keys(users).find((email) => users[email].name);
  const userName = users[userEmail]?.name;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='fixed' sx={{ width: '100%', zIndex: 1300 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src='/static/logo.png'
              alt='Logo'
              style={{
                width: '100px',
                height: 'auto',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit' onClick={handleProfileMenuOpen}>
                <Avatar sx={{ width: 32, height: 32 }}>{userName ? userName.charAt(0).toUpperCase() : ''}</Avatar>
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchorEl}
                open={isProfileMenuOpen}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleProfileMenuClose}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {userName}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleProfileMenuClose}>
                  <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                    {userEmail}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography variant='body1' sx={{ color: 'error.main' }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
