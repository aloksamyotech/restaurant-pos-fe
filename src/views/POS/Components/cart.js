import React, { useState } from 'react';
import { List, ListItem, Typography, Paper, Avatar, IconButton, Button, Box } from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CartDialog from './Submit';

const Cart = ({ cartItems, setCart,dialogOpen, handleDialogOpen, handleDialogClose, resetCart}) => {
 
  
 
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const handleRemoveDish = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem?.id !== id));
  };

  const handleIncrementQuantity = (id) => {
    setCart((prevCart) => prevCart.map((cartItem) => (cartItem?.id === id ? { ...cartItem, quantity: cartItem?.quantity + 1 } : cartItem)));
  };

  const handleDecrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem?.id === id && cartItem?.quantity > 1 ? { ...cartItem, quantity: cartItem?.quantity - 1 } : cartItem
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

 
  

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: '',
          height: '420px',

          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: 2
          }}
        >
          {cartItems?.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconButton color="primary" aria-label="add to cart">
                <AddShoppingCartIcon sx={{ fontSize: 100 }} />
              </IconButton>
            </Box>
          ) : (
            <List>
              {cartItems.map((cartItem) => (
                <ListItem
                  key={cartItem?.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    mb: 2,
                    p: 2
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mr: 2
                    }}
                  >
                    <Avatar
                      src={cartItem?.image}
                      alt={cartItem?.name}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 0,
                        border: '1px solid #ccc'
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1
                      }}
                    >
                      <IconButton onClick={() => handleDecrementQuantity(cartItem?.id)}>
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{cartItem?.quantity}</Typography>
                      <IconButton onClick={() => handleIncrementQuantity(cartItem?.id)}>
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{cartItem?.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: Rs. {cartItem?.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Subtotal: Rs. {cartItem?.price * cartItem?.quantity}
                    </Typography>
                  </Box>

                  <IconButton color="error" onClick={() => handleRemoveDish(cartItem?.id)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #ccc',
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9'
          }}
        >
          <Typography variant="h6" color="primary">
            Total: Rs. {totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" onClick={handleDialogOpen} sx={{}}>
            Submit
          </Button>

          <Button variant="contained" color="secondary" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </Box>
      </Paper>
      
    </>
  );
};

export default Cart;
