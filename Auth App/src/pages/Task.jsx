import React, { useState, useMemo, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  Avatar,
  Checkbox,
  Grid,
  Card,
  CardContent,
  Container,
  Tooltip,
  IconButton,
  createTheme,
  Box,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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

toast.dismiss();

const Task = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <AppBar position='fixed' sx={{ width: '100%', zIndex: 1300 }}>
        <Toolbar>
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

          <Typography variant='h6' sx={{ textAlign: 'center', flexGrow: 1 }}>
            Student Management
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
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
                Dashboard
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
      <div style={{ marginTop: '80px' }}>{children}</div>
    </>
  );
};

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    duration: '',
    packageType: 'Gold',
    education: '',
    profile: '',
  });
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSwitchChange = useCallback((event) => {
    setFormData((prev) => ({
      ...prev,
      course: event.target.checked ? event.target.value : '',
    }));
  }, []);

  const handleEducationChange = useCallback((event) => {
    setFormData((prev) => ({
      ...prev,
      education: event.target.value,
    }));
  }, []);

  // const handleProfileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({ ...prev, profile: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const validateForm = () => {
  //   for (const key in formData) {
  //     if (!formData[key]) {
  //       toast.error(`Please fill in ${key.replace(/([A-Z])/g, ' $1')}`);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const addRow = useCallback(() => {
    const validateForm = () => {
      for (const key in formData) {
        if (!formData[key]) {
          toast.error(`Please fill in ${key.replace(/([A-Z])/g, ' $1')}`);
          return false;
        }
      }
      return true;
    };

    if (!validateForm()) return;
    if (isEditing) {
      const updatedTableData = [...tableData];
      updatedTableData[editedRowIndex] = formData;
      setTableData(updatedTableData);
      setIsEditing(false);
      setEditedRowIndex(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        course: '',
        duration: '',
        packageType: 'Gold',
        education: '',
        profile: '',
      });
      toast.success('Student updated successfully!');
    } else {
      const newStudent = { id: tableData.length + 1, ...formData };
      setTableData((currentState) => [...currentState, newStudent]);
      localStorage.setItem('students', JSON.stringify([...tableData, newStudent]));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        course: '',
        duration: '',
        packageType: 'Gold',
        education: '',
        profile: '',
      });
      toast.success('Student added successfully!');
    }
  }, [formData, isEditing, tableData, editedRowIndex]);

  const deleteRow = useCallback((index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
    toast.info('Student deleted successfully!');
  }, []);

  const updateRow = useCallback(
    (index) => {
      const item = tableData[index];
      setFormData(item);
      setIsEditing(true);
      setEditedRowIndex(index);
    },
    [tableData]
  );

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const memoizedTableData = useMemo(() => tableData, [tableData]);

  return (
    <Container maxWidth='100%'>
      <Grid container spacing={1} sx={{ pt: 3 }}>
        <Grid item xs={12}>
          <Container maxWidth='lg' sx={{ mt: 2 }}>
            <Card
              sx={{
                position: 'relative',
                borderRadius: '8px',
                padding: '1px',
                background: 'linear-gradient(265.54deg, #FFDB5D -9.9%, #8EF1FF 16.42%, #FFCC19 71.21%, #FF3658 109.2%)',
                overflow: 'hidden',
                width: '100%',
                // maxWidth: 'lg',
              }}
            >
              <CardContent
                sx={{
                  borderRadius: 'inherit',
                  background: '#FFFAFA',
                }}
              >
                <div>
                  <Grid container spacing={1} mb={2}>
                    {/* First Name */}
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            sx={{
                              fontWeight: '500',
                              color: '#000000',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                            }}
                          >
                            First Name:
                          </Typography>
                          <TextField
                            fullWidth
                            size='small'
                            name='firstName'
                            placeholder='Johan'
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            sx={{
                              backgroundColor: '#FFFFFF',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                              },
                            }}
                          />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                          <Typography
                            sx={{
                              fontWeight: '500',
                              color: '#000000',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                            }}
                          >
                            Last Name:
                          </Typography>
                          <TextField
                            fullWidth
                            size='small'
                            name='lastName'
                            placeholder='Michel'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            sx={{
                              backgroundColor: '#FFFFFF',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#DBDBDB',
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          color: '#000000',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                        }}
                      >
                        Email:
                      </Typography>
                      <TextField
                        fullWidth
                        size='small'
                        name='email'
                        placeholder='admin@gmail.com'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                          backgroundColor: '#FFFFFF',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DBDBDB',
                            },
                            '&:hover fieldset': {
                              borderColor: '#DBDBDB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#DBDBDB',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Divider />

                  <Grid container spacing={1} sx={{ height: '100%' }} mt={1}>
                    <Grid item xs={12} sm={6} mt={1} p={0.5}>
                      <Card
                        sx={{
                          position: 'relative',
                          border: '1px solid #2980b9',
                          borderRadius: '8px',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <CardContent
                          sx={{
                            borderRadius: 'inherit',
                            background: '#FFFAFA',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              color: '#000000',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              mb: 1,
                            }}
                          >
                            Select Course:
                          </Typography>
                          {[
                            'Automobile Engineering',
                            'Computer Science and Engineering',
                            'Data science',
                            'Machine learning',
                            'Software development',
                            'Cybersecurity',
                            'Artificial Intelligence',
                          ].map((course) => (
                            <FormControlLabel
                              key={course}
                              control={
                                <Switch
                                  checked={formData.course === course}
                                  onChange={handleSwitchChange}
                                  value={course}
                                />
                              }
                              label={course}
                            />
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} mt={1} p={0.5}>
                      <Card
                        sx={{
                          position: 'relative',
                          border: '1px solid #2980b9',
                          borderRadius: '8px',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <CardContent
                          sx={{
                            borderRadius: 'inherit',
                            background: '#FFFAFA',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Card
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 1,
                              pl: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontFamily: 'Inter',
                                fontSize: '14px',
                              }}
                            >
                              Select Package:
                            </Typography>

                            <RadioGroup
                              name='packageType'
                              value={formData.packageType}
                              onChange={handleChange}
                              row
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                              }}
                            >
                              {['Gold', 'Silver', 'Platinum'].map((pkg) => (
                                <FormControlLabel key={pkg} value={pkg} control={<Radio />} label={pkg} />
                              ))}
                            </RadioGroup>
                          </Card>

                          <Card
                            sx={{
                              alignItems: 'center',
                              p: 1,
                              pl: 2,
                              mt: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                pt: 1,
                              }}
                            >
                              Choose Your Educational Background:
                            </Typography>
                            <FormControl component='fieldset' required>
                              <RadioGroup name='education' value={formData.education} onChange={handleEducationChange}>
                                <FormControlLabel value='after10th' control={<Radio />} label='After 10th' />
                                <FormControlLabel value='after12th' control={<Radio />} label='After 12th' />
                                <FormControlLabel value='afterBachelor' control={<Radio />} label='After Bachelor' />
                                <FormControlLabel value='afterGraduate' control={<Radio />} label='After Graduate' />
                              </RadioGroup>
                            </FormControl>
                          </Card>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    mt={1}
                    p={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item xs={12} sm={2} pb={1}>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: '#000000',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                        }}
                      >
                        Select Course Dureation:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <FormControl fullWidth size='small' sx={{ maxWidth: 350, height: 39 }} required>
                        <Select name='duration' value={formData.duration} onChange={handleChange} displayEmpty>
                          <MenuItem value='' disabled>
                            Duration
                          </MenuItem>
                          {['1 month', '3 months', '6 months', '1 year'].map((duration) => (
                            <MenuItem key={duration} value={duration}>
                              {duration}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={8}>
                      <Grid container>
                        <Grid item xs={12} sm={3} display='flex' justifyContent='flex-start' alignItems='center'>
                          <Button
                            variant='contained'
                            component='label'
                            sx={{
                              backgroundColor: '#2980b9',
                              color: '#fff',
                              padding: '10px 20px',
                              borderRadius: '25px',
                              '&:hover': {
                                backgroundColor: '#1c6f99',
                              },
                              height: '40px',
                            }}
                          >
                            Upload Profile
                            <input
                              type='file'
                              hidden
                              onChange={(e) =>
                                setFormData({ ...formData, profile: URL.createObjectURL(e.target.files[0]) })
                              }
                            />
                          </Button>
                        </Grid>

                        {/* Avatar - Align to the start */}
                        {formData.profile && (
                          <Grid item xs={12} sm={6} display='flex' justifyContent='flex-start'>
                            <Avatar
                              src={formData.profile}
                              sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                border: '3px solid #2980b9',
                                boxShadow: 3,
                                mt: 2,
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>

                    {/* Add Student Button - Align to the end */}
                    <Grid item xs={12} sm={4} display='flex' justifyContent='flex-end'>
                      <Button
                        variant='contained'
                        component='label'
                        sx={{
                          backgroundColor: '#2980b9',
                          color: '#fff',
                          padding: '10px 20px',
                          borderRadius: '25px',
                          '&:hover': {
                            backgroundColor: '#1c6f99',
                          },
                          mt: 2,
                          height: '40px',
                        }}
                        onClick={addRow}
                      >
                        {isEditing ? 'Save' : 'Add Student'}
                      </Button>
                    </Grid>
                  </Grid>

                  {/* <Grid item xs={12} sm={3} display='flex' justifyContent='flex-end'>
                    <Button
                      variant='contained'
                      component='label'
                      sx={{
                        backgroundColor: '#2980b9',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        '&:hover': {
                          backgroundColor: '#1c6f99',
                        },
                        mt: 2,
                      }}
                      onClick={addRow}
                    >
                      {isEditing ? 'Save' : 'Add Student'}
                    </Button>
                  </Grid> */}
                </div>
              </CardContent>
            </Card>
          </Container>
          <Card
            sx={{
              position: 'relative',
              borderRadius: '8px',
              padding: '1px',
              width: '100%',
              mt: 2,
            }}
          >
            <CardContent
              sx={{
                borderRadius: 'inherit',
                background: '#FFFAFA',
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  mt: 2,
                  maxHeight: '400px',
                  overflowX: 'scroll',
                  border: '1px solid #E6E7EC',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    height: '5px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#4E4E4E',
                    borderRadius: '12px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Table stickyHeader>
                  <TableRow
                    sx={{
                      bgcolor: '#F5F5F5',
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Select
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Profile
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      First Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Last Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Course
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Package
                    </TableCell>
                    <TableCell
                      sx={{
                        pl: 3,
                        color: 'rgba(45, 45, 45, 1)',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      align='left'
                    >
                      Actions
                    </TableCell>
                  </TableRow>

                  <TableBody>
                    {memoizedTableData.length > 0 &&
                      memoizedTableData.map((row, index) => (
                        <TableRow key={row.id} sx={{ backgroundColor: selectedRows[row.id] ? '#b3e5fc' : 'inherit' }}>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox checked={!!selectedRows[row.id]} onChange={() => handleRowSelect(row.id)} />
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            <Avatar src={row.profile} sx={{ width: 50, height: 50, borderRadius: '50%' }} />
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.firstName}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.lastName}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.course}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.duration}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            {row.packageType}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: 'rgba(45, 45, 45, 1)',
                              fontSize: '12px',
                              alignItems: 'center',
                            }}
                          >
                            <Tooltip arrow title='Edit Row' placement='top'>
                              <IconButton size='small' sx={{ color: '#4E4E4E' }} onClick={() => updateRow(index)}>
                                <EditNoteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip arrow title='Delete Row' placement='top'>
                              <IconButton size='small' sx={{ color: '#4E4E4E' }} onClick={() => deleteRow(index)}>
                                <DeleteRoundedIcon color='error' />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    {!memoizedTableData.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={10} sx={{ textAlign: 'center', padding: '20px' }}>
                          No Data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const App = () => (
  <Task>
    <FormComponent />
  </Task>
);

export default App;
