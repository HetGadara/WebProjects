import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const StudentCard = ({ student }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
        width: '100%',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar
            src={student.profile}
            sx={{
              width: 50,
              height: 50,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
          <Typography variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
            {student.firstName} {student.lastName}
          </Typography>
        </Box>

        <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 1 }}>
          <strong>Email:</strong> {student.email}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 1 }}>
          <strong>Course:</strong> {student.course}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 1 }}>
          <strong>Duration:</strong> {student.duration}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 1 }}>
          <strong>Package:</strong> {student.packageType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
