import React from "react";
import { TextField } from "@mui/material";
import {useState} from "react";

const SearchBar = () => {
const [search, handleSearch]= useState();
  return (
    <TextField
      label="Search Dish"
      variant="outlined"
      fullWidth
      // value={searchTerm}
      // onChange={handleSearch}
    />
  );
};

export default SearchBar;
