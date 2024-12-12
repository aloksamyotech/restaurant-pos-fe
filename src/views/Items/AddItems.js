import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, 
  InputAdornment, Typography,
  IconButton,} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MultipleSelect from './multiDropDown';
import CloseIcon from '@mui/icons-material/Close';

const AddItemDialog = ({ open, onClose }) => {
  const { control, handleSubmit, reset,formState: { errors } } = useForm(); 

  const [image, setImage] = useState(null); 
  const [dishImage, setDishImage] = useState(""); 
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
      setDishImage(file); 
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  }


  const onSubmit = (data) => {
    const formData = { ...data, dishImage: dishImage }; 
    console.log(formData); 
    handleClose();  
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Dish</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} marginTop={"1px"}>

          <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey',
            '&:hover': {
              color: 'red',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
           
            

            
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

            <Grid item xs={6}>
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
                    <MenuItem value="Fast Food">Fast Food</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Beverage">Beverage</MenuItem>
                  </TextField>
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

            <Grid item xs={6}><MultipleSelect/></Grid>

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

export default AddItemDialog;
