import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { urls } from "core/constant/urls";
import {postApi} from 'core/apis/apiClient.js';

const AddCategoriesDialog = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [image, setImage] = useState(null);
  const [categoryImage, setDishImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setDishImage(file);
    }
  };


  const onSubmit =async(data) => {
    const formData = { ...data, categoryImage: categoryImage };
    console.log(formData);
    const response = await postApi(urls?.foodCategory.create, formData);
    // const response = await axios.post("http://localhost:7200/api/v1/category/addCategory", formData);
    setData(response.data);
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
                name="categoryName"
                control={control}
                defaultValue=""
                rules={{ required: 'Dish Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dish Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.categoryName}
                    helperText={errors?.categoryName ? errors?.categoryName?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="desc"
                control={control}
                defaultValue=""
                
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                   
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
              {errors?.categoryImage && <Typography color="error">{errors?.categoryImage?.message}</Typography>}
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
