import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import DishesGrid from "./Components/DishesGrid";
import { Container, Grid, Paper, Typography,Card, Button, Stack } from "@mui/material";
import useDishes from "./Components/Dishes";
import Cart from "./Components/Cart";
import Dropdown from "./Components/dropDown";
import CartDialog from "./Components/Submit";


const POS = () => {
  const [cartStore, setCart] = useState([]);
  const [dishesPerRow, setDishesPerRow] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dishes = useDishes();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = dishes.filter((dish) =>
    dish?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );




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
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);


  return (
    <>
      <Container maxWidth="xl" >
      <Card sx={{p:1,m:1}}>
        <Stack direction="row" alignItems="flex-start" spacing={1} >
          <SearchBar setSearchQuery={setSearchQuery} />
        <Dropdown dishesPerRow={dishesPerRow} setDishesPerRow={setDishesPerRow} />
        <Button variant="outlined" sx={{ mt: "3" }}  onClick={handleDialogOpen}>Submit</Button>
        </Stack>
      
      </Card>

        <Grid container spacing={0.5}>

          <Grid item xs={12} md={8}  >
         
            <DishesGrid  dishes={filteredDishes}  onAddToCart={handleAddToCart}  dishesPerRow={dishesPerRow} />
          </Grid>


          <Grid item xs={12} md={4} >

            <Card sx={{ p: 0, width: '110%' }}>
            
              <Cart cartItems={cartStore} setCart={setCart} />
            </Card>
          </Grid>
        </Grid>

      </Container>
      <CartDialog open={dialogOpen} onClose={handleDialogClose} cartItems={cartStore} />



    </>
  );
};

export default POS;