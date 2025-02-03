import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { sentApi, updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';

const CategoryDialog = ({ open, onClose, category, fetchData, setSnackbarMessage, setSnackbarOpen, isEdit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [image, setImage] = useState(null);
  const [dishImage, setDishImage] = useState(null);

  useEffect(() => {
    if (isEdit && category) {
      reset({
        categoryName: category?.name || '',
        desc: category?.desc || ''
      });
      setImage(category?.categoryImage || null);
    } else {
      reset({
        categoryName: '',
        desc: ''
      });
      setImage(null);
      setDishImage(null);
    }
  }, [category, isEdit, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setDishImage(file);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('categoryName', data?.categoryName);
    formData.append('desc', data?.desc);

    formData.append('categoryImage', dishImage);

    setIsLoading(true);

    try {
      let response;
      if (isEdit) {
        response = await updateApi(urls?.foodCategory?.update?.replace(':id', category?.id), formData);

        reset();
      } else {
        response = await sentApi(urls?.foodCategory?.create, formData);
        reset();
      }

      if (response.success) {
        fetchData();
        reset();
        setImage(null);
        setDishImage(null);
        onClose();
        setSnackbarMessage(isEdit ? 'Category updated successfully!' : 'Category added successfully!');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(isEdit ? 'Failed to update category!' : 'Failed to add category!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(isEdit ? 'Error updating category!' : 'Error adding category!');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{isEdit ? 'Edit Category' : 'Add New Category'}</DialogTitle>
      <DialogContent>
        {isLoading && <Loader isVisible={isLoading}></Loader>}
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
                    error={!!errors?.desc}
                    helperText={errors?.desc ? errors?.desc?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Upload Dish Image
              </Typography>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  Choose Image
                </Button>
              </label>

              {image && (
                <img
                  src={image}
                  alt="Dish preview"
                  style={{ marginTop: '10px', width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                />
              )}
              {errors?.dishImage && <Typography color="error">{errors?.dishImage?.message}</Typography>}
            </Grid>
          </Grid>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
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

export default CategoryDialog;
