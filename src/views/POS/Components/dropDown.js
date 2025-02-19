import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { t } from 'i18next';

const Dropdown = ({ dishesPerRow, setDishesPerRow }) => {
  const handleDishesPerRowChange = (event) => {
    setDishesPerRow(event.target.value);
  };

  return (
    <Box>
      <Select value={dishesPerRow} onChange={handleDishesPerRowChange} variant="outlined" fullWidth>
        <MenuItem value={2}>{t('2 Dishes Per Row')}</MenuItem>
        <MenuItem value={3}>{t('3 Dishes Per Row')}</MenuItem>
        <MenuItem value={4}>{t('4 Dishes Per Row')}</MenuItem>
        <MenuItem value={5}>{t('6 Dishes Per Row')}</MenuItem>
      </Select>
    </Box>
  );
};

export default Dropdown;
