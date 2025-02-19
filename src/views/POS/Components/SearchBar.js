import React from 'react';
import { TextField, Box } from '@mui/material';
import { t } from 'i18next';

const SearchBar = ({ setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event?.target?.value);
  };

  return (
    <Box>
      <TextField label={t('Search Dish')} variant="outlined" onChange={handleSearchChange} fullWidth />
    </Box>
  );
};

export default SearchBar;
