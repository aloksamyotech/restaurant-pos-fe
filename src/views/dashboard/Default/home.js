import React from 'react';
import { Box } from '@mui/material';
import restaurantImage from 'assets/images/restaurant_serving_dashboarddefault.jpg';

const Image = () => (
  <Box
    component="img"
    src={restaurantImage}
    alt="Restaurant"
    sx={{
      maxWidth: '100%', // Scale to fit the container
      height: 'auto',   // Maintain aspect ratio
      display: 'block',
    }}
  />
);

export default Image;
