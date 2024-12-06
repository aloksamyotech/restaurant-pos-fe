import React from "react";
import { TextField,Grid,Paper, Typography } from "@mui/material";
import {useState} from "react";
import dishes from "./Dishes";

function SearchBar() {
const [search, handleSearch]= useState('');
const searchDishes = dishes.filter((dish)=>{
dish.name.toLowerCase().startsWith(search.toLowerCase())
});


  return (
<>
    
    <TextField
      label="Search Dish"
      variant="outlined"
      onchange={(e)=>handleSearch(e.target.value)}
      sx={{ width: '100%', mb: 2 }}
    />

<Grid container spacing={2}>
        {searchDishes.map((dish) => (
          <Grid item xs={12} md={4} key={dish.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="body1">{dish.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      </>
  );
}

export default SearchBar;
