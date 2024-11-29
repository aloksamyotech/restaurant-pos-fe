import React from "react";
import { List, ListItem, ListItemText, Typography, Paper, Avatar, ListItemAvatar,IconButton,Button } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
const Cart = ({ cartItems,setCart }) => { 

  let totalPrice = 0;

  for (let item of cartItems) {
    totalPrice += item.price * item.quantity;
  }
// Remove Dish
  const handleRemoveDish = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

    // Increment the quantity
    const handleIncrementQuantity = (id) => {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    };
     // Decrement the quantity
  const handleDecrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  // Clear the cart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Paper sx={{p:1, mt: 1 }}>

      <List>
        {cartItems.length === 0 ? (
          <ListItem sx={{ textAlign:"left"}}>
            <ListItemText primary="Add Dish " />
          </ListItem>
        ) : (
          cartItems.map((cartItem) => (               
            <ListItem key={cartItem.id}>                    
              <ListItemAvatar>
                <Avatar src={cartItem.image} alt={cartItem.name} />
              </ListItemAvatar>
              <ListItemText
                primary={`${cartItem.name} (x${cartItem.quantity})`}        
                secondary={`Rs. ${cartItem.price * cartItem.quantity}`}   
                />
                <IconButton onClick={() => handleDecrementQuantity(cartItem.id)}>
                <Remove />
              </IconButton>
              <IconButton onClick={() => handleIncrementQuantity(cartItem.id)}>
                <Add />
              </IconButton>
              <IconButton onClick={() => handleRemoveDish(cartItem.id)}>
                <Delete />
              </IconButton>
         
            </ListItem>
          ))
        )}
      </List>

      <Typography variant="h6" color="primary" align="right">
        Total: Rs. {totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        fullWidth
        onClick={handleClearCart}
      >
        Clear Cart
      </Button>
    </Paper>
  );
};

export default Cart;
