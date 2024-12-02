import React from "react";
import { List, ListItem, ListItemText, Typography, Paper, Avatar, ListItemAvatar,IconButton,Button,Box } from "@mui/material";
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
    <Paper sx={{ p: 2, mt: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
    <List>
      {cartItems.length === 0 ? (
        <ListItem sx={{ textAlign: "center" }}>
          <ListItemText primary="Add a Dish to the Cart" />
        </ListItem>
      ) : (
        cartItems.map((cartItem) => (
          <ListItem
            key={cartItem.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "8px",
              mb: 2,
              p: 2,
            }}
          >
            {/* Dish Image and Controls */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Avatar
                src={cartItem.image}
                alt={cartItem.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 0,
                  border: "1px solid #ccc",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <IconButton onClick={() => handleDecrementQuantity(cartItem.id)}>
                  <Remove />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{cartItem.quantity}</Typography>
                <IconButton onClick={() => handleIncrementQuantity(cartItem.id)}>
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Dish Details */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{cartItem.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Price: Rs. {cartItem.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Subtotal: Rs. {cartItem.price * cartItem.quantity}
              </Typography>
            </Box>

            {/* Delete Button */}
            <IconButton
              color="error"
              onClick={() => handleRemoveDish(cartItem.id)}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>

    {/* Total and Clear Cart */}
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
