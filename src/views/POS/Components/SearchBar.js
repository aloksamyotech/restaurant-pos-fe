import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event?.target?.value);
  };

  return (
    <Box>
      <TextField label="Search Dish" variant="outlined" onChange={handleSearchChange}  fullWidth/>
    </Box>
  );
};

export default SearchBar;
