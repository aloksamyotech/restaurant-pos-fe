import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import DishesGrid from './Components/DishesGrid';
import { Container, Grid, Card, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import useDishes from './Components/Dishes';
import Cart from './Components/cart';
import Dropdown from './Components/dropDown';
import CartDialog from './Components/Submit';
import { Box } from '@mui/system';
import { t } from 'i18next';

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

  const resetCart = () => {
    setCart([]);
  };
  const [orderType, setOrderType] = React.useState('');

  const handleChange = (event) => {
    setOrderType(event?.target?.value);
  };

  return (
    <>
      <Container>
        <Card sx={{ p: 1, m: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <SearchBar setSearchQuery={setSearchQuery} />
            </Grid>

            <Grid item xs={2}>


              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderType}
                  label="Order Type"
                  onChange={handleChange}
                  
                >
                  <MenuItem value={"Dining"}>{t('Dining')} </MenuItem>
                  <MenuItem value={"Pickup"}>{t('Pickup')}</MenuItem>

                </Select>
                
              </FormControl>


            </Grid>
            <Grid item xs={2}>
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
      <CartDialog open={dialogOpen} onClose={handleDialogClose} cartItems={cartStore} resetCart={resetCart} orderType={orderType} />
    </>
  );
};

export default POS;
