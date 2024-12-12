import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const AddCategoriesDialog = ({ open, onClose }) => {
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
      <DialogTitle>Add New Dish</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>




            <Grid item xs={6}>
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
                    error={!!errors?.dishName}
                    helperText={errors?.dishName ? errors?.dishName?.message : ''}
                  />
                )}
              />
            </Grid>









            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>Upload Dish Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">Choose Image</Button>
              </label>
              {image && <img src={image} alt="Dish preview" style={{ marginTop: '10px', width: '100%', maxHeight: '300px', objectFit: 'contain' }} />}
              {errors?.dishImage && <Typography color="error">{errors?.dishImage?.message}</Typography>}
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

export default AddCategoriesDialog;
