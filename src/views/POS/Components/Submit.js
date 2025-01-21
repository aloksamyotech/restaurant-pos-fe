import React from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import { CrossIcon } from 'common/crossIcon';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const CartDialog = ({ open, onClose, cartItems, resetCart }) => {
  const { handleSubmit, reset, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const onSubmit = async () => {
    let items = cartItems.map((item) => {
      return {
        id: item?.id,
        quantity: item?.quantity,
        name: item?.name,
        price: item?.price
      };
    });
    const phonedata = {
      phone: phone
    };
    const customerResponse = await postApi(urls?.customer?.create, phonedata);
    const customerId = customerResponse?.data?._id;

    if (!customerId) {
      return;
    }
    const payload = {
      customerId,
      items,
      totalPrice,
      discount,
      paymentMode,
      phone
    };
    const orderResponse = await postApi(urls?.order?.create, payload);
    const orderId = orderResponse?.data?._id;

    if (!orderId) {
      return;
    }
    const paymentPayload = {
      orderId,
      paymentMode,
      amount: totalPrice
    };
    const paymentResponse = await postApi(urls?.payment?.create, paymentPayload);
    const paymentId = paymentResponse?.data?._id;

    if (!paymentId) {
      return;
    }
    const invoicePayload = {
      paymentId,
      customerId,
      orderId,
      paymentMode,
      amount: totalPrice,
      discount,
      items
    };
    const invoiceResponse = await postApi(urls?.invoice?.create, invoicePayload);
    const invoiceId = invoiceResponse?.data?._id;

    reset();
    resetCart();
    onClose();
    navigate(`invoice/${invoiceId}`);
  };

  const [paymentMode, setPaymentMode] = useState('Cash');

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const [discount, setDiscount] = useState(0);
  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    setDiscount(value);
  };
  const [phone, setPhoneNumber] = useState('');
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const adjustedPrice = totalPrice - discount;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Cart Summary
      </DialogTitle>

      <DialogContent sx={{ padding: '16px', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CrossIcon />
          {cartItems?.length > 0 ? (
            <>
              <List>
                {cartItems.map((item) => (
                  <ListItem
                    key={item?.id}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      mb: 2
                    }}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={2}>
                        <Avatar src={item?.image} alt={item?.name} sx={{ width: 56, height: 56 }} />
                      </Grid>
                      <Grid item xs={7}>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                              {item?.name} (x{item?.quantity})
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: 'right' }}>
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
                    <Select
                      labelId="payment-mode-label"
                      id="payment-mode"
                      value={paymentMode}
                      onChange={handlePaymentModeChange}
                      label="Payment Mode"
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Discount" type="number" value={discount} onChange={handleDiscountChange} variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Mobile Number" variant="outlined" value={phone} onChange={handleMobileChange}
                  />
   

                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  textAlign: 'right',
                  backgroundColor: '#fff',
                  padding: '16px',
                  borderRadius: '8px'
                }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Total Price
                </Typography>
                <Typography variant="h5" color="secondary">
                  Rs. {adjustedPrice.toFixed(2)}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
              Your cart is empty.
            </Typography>
          )}

          <DialogActions
            sx={{
              justifyContent: 'center',
              backgroundColor: '#f9f9f9',
              padding: '16px'
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Place the order
            </Button>
            <Button onClick={onClose} variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
