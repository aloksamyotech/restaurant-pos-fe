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
      
      const existingItem = prevCart.find((cartItem) => cartItem?.id === item?.id);
  
      if (existingItem) {
        
        return prevCart.map((cartItem) =>
          cartItem?.id === item?.id
            ? { ...cartItem, quantity: cartItem?.quantity + 1 }
            : cartItem
        );
      } else {
       
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
 
  return(
    <>
   <Container maxWidth="lg" sx={{bgcolor:''}}>
      <Grid container spacing={1}>
       
        <Grid item xs={12} md={8}  >
          <SearchBar />
          <DishesGrid dishes={dishes} 
          
          onAddToCart={handleAddToCart}/>

          
        </Grid>
       

        
        <Grid item xs={12} md={4}   
    >
          <Paper elevation={1} sx={{ p: 1,width:'110%'}}>
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