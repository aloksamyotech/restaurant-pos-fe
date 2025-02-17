import React from 'react';
import { TextField } from '@mui/material';
import { t } from 'i18next';
const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <TextField
      label={t('Search')}
      variant="outlined"
      size="small"
      sx={{ flex: 1 }}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
