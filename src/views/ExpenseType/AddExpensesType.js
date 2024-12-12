import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const AddExpensesTypeDialog = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  
  const onSubmit = (data) => {
    const formData = { ...data}; 
    console?.log(formData); 
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add Expenses Type</DialogTitle>
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
                    label="Expense"
                    variant="outlined"
                    fullWidth
                    error={!!errors.dishName}
                    helperText={errors.dishName ? errors.dishName.message : ''}
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

export default AddExpensesTypeDialog;
