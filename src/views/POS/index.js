import React, {useState} from "react";
import SearchBar from "./Components/SearchBar";
import DishesGrid from "./Components/DishesGrid";
import { Container,Grid, Paper, Typography } from "@mui/material";
import dishes from "./Components/Dishes";
import Cart from "./Components/Cart";

const POS=() =>{
  const [cartStore, setCart] = useState([]);

  const handleDishClick = (dish) => {
    setCart((updateCart) => [...updateCart, dish]);
  };
 
  return(
    <>
   <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {/* Left Section--Dishes */}
        <Grid item xs={12} md={8}>
          <SearchBar />
          <DishesGrid dishes={dishes} onDishClick={handleDishClick}/>

          
        </Grid>

        {/* Right Section--Cart */}
        <Grid item xs={10} md={4}>
          <Paper elevation={24} sx={{ p: 5}}>
            <Typography variant="h5" sx={{ mb: 9 }}>
              Your Dish Box
            </Typography>
            <Cart cartItems={cartStore}/>
          </Paper>
        </Grid>
      </Grid>
    
    </Container>
     
      
    
    </>
  );
};

export default POS;