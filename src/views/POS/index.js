import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import DishesGrid from "./Components/DishesGrid";
import { Container, Grid, Paper, Typography,Card, Button, Stack } from "@mui/material";
import dishes from "./Components/Dishes";
import Cart from "./Components/Cart";
import Dropdown from "./Components/dropDown";


const POS = () => {
  const [cartStore, setCart] = useState([]);
  const [dishesPerRow, setDishesPerRow] = useState(3);


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


  return (
    <>
      <Container maxWidth="xl" sx={{ }}>
      <Card sx={{p:1,m:1}}>
        <Stack direction="row"><SearchBar />
        <Dropdown dishesPerRow={dishesPerRow} setDishesPerRow={setDishesPerRow} />
        <Button variant="outlined" >Submit</Button>
        </Stack>
      
      </Card>

        <Grid container spacing={0.5}>

          <Grid item xs={12} md={8}  >
            
            <DishesGrid dishes={dishes} onAddToCart={handleAddToCart}  dishesPerRow={dishesPerRow} />
          </Grid>


          <Grid item xs={12} md={4} >

            <Card sx={{ p: 0, width: '110%' }}>
              {/* <Typography variant="h5" sx={{ mb: 2 }}>
                Your Dish Box
              </Typography> */}
              <Cart cartItems={cartStore} setCart={setCart} />
            </Card>
          </Grid>
        </Grid>

      </Container>



    </>
  );
};

export default POS;