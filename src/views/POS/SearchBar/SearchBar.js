import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <TextField
      label="Search Dish"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
