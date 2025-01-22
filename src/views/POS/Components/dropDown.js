import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';

const Dropdown = ({ dishesPerRow, setDishesPerRow }) => {
  const handleDishesPerRowChange = (event) => {
    setDishesPerRow(event.target.value);
  };

  return (
    <Box>
      <Select value={dishesPerRow} onChange={handleDishesPerRowChange} variant="outlined" fullWidth>
        <MenuItem value={2}>2 Dishes Per Row</MenuItem>
        <MenuItem value={3}>3 Dishes Per Row</MenuItem>
        <MenuItem value={4}>4 Dishes Per Row</MenuItem>
        <MenuItem value={5}>5 Dishes Per Row</MenuItem>
      </Select>
    </Box>
  );
};

export default Dropdown;
