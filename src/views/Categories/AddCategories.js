import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography,IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import { postApi } from 'core/apis/apiClient.js';
import { sentApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';



const AddCategoryDialog = ({ open, onClose, fetchData,setSnackbarMessage, setSnackbarOpen }) => {
  const { control, handleSubmit,reset, formState: { errors } } = useForm();

    const [image, setImage] = useState(null);
    const [dishImage, setDishImage] = useState("");
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
        setDishImage(file);
      }
    };
  
  


  
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('categoryName', data?.categoryName);
    formData.append('desc', data?.desc);
    if (dishImage) {
      formData.append('categoryImage', dishImage);
    }
  
   
  
    const response = await sentApi(urls?.foodCategory?.create, formData); 
  
    fetchData();
    reset();
    onClose();
    setSnackbarMessage('Category added successfully!');
    setSnackbarOpen(true);
  };
  
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Category</DialogTitle>
      <DialogContent>
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
                  color: 'red',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Grid mt={1} item xs={12}>
              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Category Name is required',
                  maxLength: { value: 50, message: 'Category Name must be at most 50 characters' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.categoryName}
                    helperText={errors?.categoryName ? errors?.categoryName?.message : ''}
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

export default AddCategoryDialog;
