import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Grid,
} from "@mui/material";

const CartDialog = ({ open, onClose, cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Cart Summary
      </DialogTitle>

      
      <DialogContent sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
        {cartItems?.length > 0 ? (
          <>
          
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item?.id}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    mb: 2,
                    
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                      <Avatar
                        src={item?.image}
                        alt={item?.name}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: "bold" }}>
                            {item?.name} (x{item?.quantity})
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right" }}>
                      <Typography variant="body2" color="textSecondary">
                        Price: Rs. {item?.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Subtotal: Rs. {(item?.price * item?.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            
            <Box
              sx={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Total Price
              </Typography>
              <Typography variant="h5" color="secondary">
                Rs. {totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center" }}
          >
            Your cart is empty.
          </Typography>
        )}
      </DialogContent>

      
      <DialogActions
        sx={{
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          padding: "16px",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;

