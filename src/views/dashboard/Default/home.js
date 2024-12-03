import React from 'react';
import { Box } from '@mui/material';
import restaurantImage from 'assets/images/dashboard_default_image.jpg';

const Image = () => (
  <Box
    component="img"
    src={restaurantImage}
    alt="Restaurant"
    sx={{
      maxWidth: '100%', 
      height: 'auto',   
      display: 'block',
    }}
  />
);

export default Image;
