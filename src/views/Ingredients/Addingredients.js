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
  Typography,
  IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
const AddIngredientDialog = ({ open, onClose, fetchData, setSnackbarMessage, setSnackbarOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await postApi(urls?.ingredient?.create, formData);
        fetchData();
        reset();
        onClose();
        setSnackbarMessage('Ingredient added successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error(error);
        setSnackbarMessage('Error adding Ingredient!');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Ingredient</DialogTitle>
      <DialogContent>
        {loading && <Loader isVisible={loading}></Loader>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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

            <Grid mt={1} item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Ingredient Name is required',
                  maxLength: { value: 50, message: 'Modifier Name must be at most 50 characters' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ingredient Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid mt={1} item xs={12}>
              <Controller
                name="desc"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount <= 200 || 'Description must be at most 200 words';
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    error={!!errors.desc}
                    helperText={errors.desc ? errors.desc.message : ''}
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
                  },
                  validate: (value) => value >= 0 || 'Cost must be positive',
                  maxLength: { value: 10, message: 'Cost must be at most 10 digits' }
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
                  },
                  validate: (value) => value >= 0 || 'Cost must be positive',
                  maxLength: { value: 10, message: 'Cost must be at most 10 digits' }
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
                name="quantity"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Quantity is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid quantity format'
                  },
                  validate: (value) => value >= 0 || 'Cost must be positive',
                  maxLength: { value: 10, message: 'Cost must be at most 10 digits' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Qty"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.quantity}
                    helperText={errors?.quantity ? errors?.quantity?.message : ''}
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="unit"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Unit is required'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Unit"
                    variant="outlined"
                    fullWidth
                    error={!!errors.unit}
                    helperText={errors?.unit ? errors?.unit.message : ''}
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
              Submit
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
