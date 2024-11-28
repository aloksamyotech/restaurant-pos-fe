import React from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

const Cart = ({ cartItems }) => {

let totalPrice = 0;

for (let item of cartItems) {
  totalPrice += item.price;
}

  return (
    <Paper sx={{ p: 1, mt: 1 }}>
      
      <List>
        {cartItems.length == 0 ? (
          <ListItem>
            <ListItemText primary="Add Dish " />
          </ListItem>
        ) : (
          cartItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.name}
                secondary={`Rs. ${item.price}`}
              />
            </ListItem>
          ))
        )}
      </List>

      <Typography variant="h6" color="primary" align="right">
        Total: Rs. {totalPrice.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default Cart;
