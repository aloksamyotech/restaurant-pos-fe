import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const AddIngredientDialog = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  
  const onSubmit = (data) => {
    const formData = { ...data}; 
    console?.log(formData); 
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Dish</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
             <Grid mt={1} item xs={12}>
              <Controller
                name="dishName"
                control={control}
                defaultValue=""
                rules={{ required: 'Dish Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dish Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.dishName}
                    helperText={errors.dishName ? errors.dishName.message : ''}
                  />
                )}
              />
            </Grid>

          
            <Grid item xs={6}>
              <Controller
                name="cost"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Cost is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid cost format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cost"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.cost}
                    helperText={errors?.cost ? errors?.cost?.message : ''}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>

           
            <Grid item xs={6}>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Price is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid price format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.price}
                    helperText={errors?.price ? errors?.price?.message : ''}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="qty"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Quantity is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid qty format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Qty"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.qty}
                    helperText={errors?.qty ? errors?.qty?.message : ''}
                    type="number"
                    
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
  <Controller
    name="units"
    control={control}
    defaultValue=""
    rules={{
      required: 'Unit is required',
    }}
    render={({ field }) => (
      <TextField
        {...field}
        select
        label="Units"
        variant="outlined"
        fullWidth
        error={!!errors.units}
        helperText={errors?.units ? errors?.units.message : ''}
      >
        {['kg', 'ltr', 'pieces'].map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </TextField>
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

export default AddIngredientDialog;
