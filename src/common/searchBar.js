import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      sx={{ flex: 1 }}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
