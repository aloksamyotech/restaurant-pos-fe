import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const AddUser = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [image, setImage] = useState(null);
  const [dishImage, setDishImage] = useState('');

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
      <DialogTitle>Add New Dish</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="expense"
                control={control}
                defaultValue=""
                rules={{ required: 'Expense is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expense"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.expense}
                    helperText={errors?.expense ? errors?.expense?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category ? errors.category.message : ''}
                  >
                    <MenuItem value="Kitchen Expenses">Kitchen Expenses</MenuItem>
                    <MenuItem value="Drinks">Drinks</MenuItem>
                    <MenuItem value="Human Resource">Human Resource</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                  required: 'amount is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid cost format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.amount}
                    helperText={errors?.amount ? errors?.amount?.message : ''}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
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

export default AddUser;
