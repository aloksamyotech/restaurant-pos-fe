import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const Customer = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  const [image, setImage] = useState(null); 
  const [dishImage, setDishImage] = useState(""); 
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
      setDishImage(file); 
    }
  };


  const onSubmit = (data) => {
    const formData = { ...data, dishImage: dishImage }; 
    console.log(formData); 
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
           
            

            
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.name}
                    helperText={errors?.name ? errors?.name?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.email}
                    helperText={errors?.email ? errors?.email?.message : ''}
                  />
                )}
              />
            </Grid>
           
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: 'phone is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.phone}
                    helperText={errors?.phone ? errors?.phone?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: 'address is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.address}
                    helperText={errors?.address ? errors?.address?.message : ''}
                  />
                )}
              />
            </Grid>

           
           
            

            

           
            
          </Grid>

          <DialogActions>
          <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Customer;
