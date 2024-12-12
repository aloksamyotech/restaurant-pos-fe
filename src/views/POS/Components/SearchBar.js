import React from "react";
import { TextField,Grid,Paper, Typography } from "@mui/material";
import {useState} from "react";
import dishes from "./Dishes";

function SearchBar() {



  return (
<>
    
    <TextField
      label="Search Dish"
      variant="outlined"
      onchange={(e)=>handleSearch(e.target.value)}
      sx={{ width: '100%', m: "1px" }}
    />


      
      </>
  );
}

export default SearchBar;
