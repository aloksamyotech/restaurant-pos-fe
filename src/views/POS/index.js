import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import DishesGrid from './Components/DishesGrid';
import { Container, Grid, Paper, Typography, Card, Button, Stack } from '@mui/material';
import useDishes from './Components/Dishes';
import Cart from './Components/cart';
import Dropdown from './Components/dropDown';
import CartDialog from './Components/Submit';
import { width } from '@mui/system';

const POS = () => {
  const [cartStore, setCart] = useState([]);
  const [dishesPerRow, setDishesPerRow] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dishes = useDishes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = dishes.filter((dish) => dish?.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem?.id === item?.id);

      if (existingItem) {
        return prevCart.map((cartItem) => (cartItem?.id === item?.id ? { ...cartItem, quantity: cartItem?.quantity + 1 } : cartItem));
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const [cartItems, setCartItems] = useState([]);

  const resetCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Container>
        <Card sx={{ p: 1, m: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <SearchBar setSearchQuery={setSearchQuery} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown dishesPerRow={dishesPerRow} setDishesPerRow={setDishesPerRow} />
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={0.5}>
          <Grid item xs={12} md={8}>
            <DishesGrid dishes={filteredDishes} onAddToCart={handleAddToCart} dishesPerRow={dishesPerRow} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 0, width: '110%' }}>
              <Cart
                cartItems={cartStore}
                setCart={setCart}
                dialogOpen={dialogOpen}
                handleDialogOpen={handleDialogOpen}
                handleDialogClose={handleDialogClose}
                resetCart={resetCart}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CartDialog open={dialogOpen} onClose={handleDialogClose} cartItems={cartStore} resetCart={resetCart} />
    </>
  );
};

export default POS;
