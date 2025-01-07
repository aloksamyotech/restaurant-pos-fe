import React, { useState,useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem,
  InputAdornment, Typography,
  IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MultipleSelect from './multiDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { urls } from "core/constant/urls";
import { postApi } from 'core/apis/apiClient.js';
import { getApi } from 'core/apis/apiClient.js';


const AddItemDialog = ({ open, onClose,fetchData,setSnackbarMessage, setSnackbarOpen }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const [image, setImage] = useState(null);
  const [dishImage, setDishImage] = useState("");
 

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      setImage(URL?.createObjectURL(file));
      setDishImage(file);
    }
  };

  const handleClose = () => {
    
    onClose();
  }


  const [categories, setcategories,] = useState([]);
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categoryResponse] = await Promise.all([

          getApi(urls?.foodCategory?.get),
        ]);

        setcategories(categoryResponse.data);
      } catch (error) {
        setSnackbarMessage('Failed to load dropdown data');
        setSnackbarOpen(true);
      }
    };
    fetchDropdownData();
  }, []);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleIngredientSelection = (ingredients) => {
    setSelectedIngredients(ingredients); 
  };


  const onSubmit = async (data) => {
   
    const formData = new FormData();
    
    
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('cost', data.cost);
    formData.append('price', data.price);
    formData.append('categoryId', data.categoryId);
    formData.append('ingredients', JSON.stringify(selectedIngredients));

    
    if (data?.dishImage && data?.dishImage[0]) {
      formData.append('dishImage', data?.dishImage[0]); 
    }
   
    const response = await postApi(urls?.item?.create, formData);
    fetchData();
    reset();
    onClose();
    setSnackbarMessage('Item added successfully!');
  setSnackbarOpen(true);
  };


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
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




            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Item Name is required',
                  maxLength: { value: 50, message: 'Item Name must be at most 50 characters' }
                 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Item Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.name}
                    helperText={errors?.name ? errors?.name?.message : ''}
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
                  validate: value => {
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
                  validate: value => (value >= 0) || 'Cost must be positive',
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
                  validate: value => (value >= 0) || 'Price must be positive',
                  maxLength: { value: 10, message: 'Price must be at most 10 digits' }
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
          <MultipleSelect onSelectionChange={handleIngredientSelection}/>
      </Grid>

            <Grid item xs={6}>
              <Controller
                name="categoryId"
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
                    error={!!errors.categoryId}
                    helperText={errors.categoryId ? errors.categoryId.message : ''}
                  >
                    {categories.map((type) => (
                      <MenuItem key={type._id} value={type._id}>
                        {type.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
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

export default AddItemDialog;
