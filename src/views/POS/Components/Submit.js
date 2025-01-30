import React, { useState } from 'react';
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
  MenuItem,
  IconButton,
  Snackbar
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

const CartDialog = ({ open, onClose, cartItems, resetCart }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [discount, setDiscount] = useState(0);
  const [phone, setPhoneNumber] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [navigateTo, setNavigateTo] = useState('');

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    setDiscount(value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const adjustedPrice = totalPrice - discount;

  const onSubmit = async () => {
    setLoading(true);
    try {
      let items = cartItems.map((item) => ({
        id: item?.id,
        quantity: item?.quantity,
        name: item?.name,
        price: item?.price,
        cost: item?.cost
      }));

      const phonedata = { phone };
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

      setSnackbarOpen(true);
      setNavigateTo(`invoice/${invoiceId}`);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey',
                '&:hover': {
                  color: 'red'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
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
                          <Avatar src={`${urls?.item?.image}${item?.image}`} alt={item?.name} sx={{ width: 56, height: 56 }} />
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
                        <MenuItem value="Card">Card</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Discount"
                      type="number"
                      value={discount}
                      onChange={handleDiscountChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      value={phone}
                      onChange={handleMobileChange}
                      error={phone.length > 0 && phone.length !== 10}
                      helperText={phone.length > 0 && phone.length !== 10 ? 'Mobile number must be exactly 10 digits.' : ''}
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
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place the order'}
              </Button>
              <Button onClick={onClose} variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Do you want to print the invoice?"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <>
            <Button
              color="primary"
              onClick={() => {
                setSnackbarOpen(false);
                setOrderPlaced(true);
                setLoading(false);
                navigate(navigateTo);
              }}
            >
              Yes
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setSnackbarOpen(false);
                resetCart();
                setOrderPlaced(true);
                setLoading(false);
                onClose();
                navigate('/dashboard/pos');
              }}
            >
              No
            </Button>
          </>
        }
      />
      <Snackbar
        open={orderPlaced}
        autoHideDuration={3000}
        onClose={() => setOrderPlaced(false)}
        message="Your order placed successfully !"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default CartDialog;
