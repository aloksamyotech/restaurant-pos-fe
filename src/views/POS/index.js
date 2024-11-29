import React, {useState} from "react";
import SearchBar from "./Components/SearchBar";
import DishesGrid from "./Components/DishesGrid";
import { Container,Grid, Paper, Typography } from "@mui/material";
import dishes from "./Components/Dishes";
import Cart from "./Components/Cart";


const POS=() =>{
  const [cartStore, setCart] = useState([]);

  
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      // Check the dish exist in the cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  
      if (existingItem) {
        // If exists, update the quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If not exists, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
 
  return(
    <>
   <Container maxWidth="xl" sx={{ mt: 1}}>
      <Grid container spacing={2}>
        {/* Left Section--Dishes */}
        <Grid item xs={12} md={8}>
          <SearchBar />
          <DishesGrid dishes={dishes} 
          
          onAddToCart={handleAddToCart}/>

          
        </Grid>
       

        {/* Right Section--Cart */}
        <Grid item xs={10} md={4}>
          <Paper elevation={24} sx={{ p: 2}}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your Dish Box
            </Typography>
            <Cart cartItems={cartStore} setCart={setCart}/>
          </Paper>
        </Grid>
      </Grid>
    
    </Container>
     
      
    
    </>
  );
};

export default POS;