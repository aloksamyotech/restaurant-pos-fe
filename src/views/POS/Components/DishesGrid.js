import React from 'react';
import { Box, Grid } from '@mui/material';
import DishCard from './DishCard';

const DishDataGrid = ({ dishes, dishesPerRow, onAddToCart }) => {
  const calculateGridColumns = () => {
    return Math.floor(12 / dishesPerRow);
  };

  return (
    <Box
      sx={{
        height: '400px',
        overflowY: 'auto',

        borderRadius: '8px'
      }}
    >
      <Grid container spacing={0.1}>
        {dishes.map((dish) => (
          <Grid item xs={calculateGridColumns()} key={dish.id}>
            <DishCard dish={dish} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DishDataGrid;
