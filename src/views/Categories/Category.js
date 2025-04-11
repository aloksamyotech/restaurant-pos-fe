import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { sentApi, updateApiPatch, updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { useTranslation } from 'react-i18next';

const CategoryDialog = ({ open, onClose, category, fetchData, setSnackbarMessage, setSnackbarOpen, isEdit }) => {
 
  
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });

  const [image, setImage] = useState(null);
  const [dishImage, setDishImage] = useState(null);

  useEffect(() => {
    if (isEdit && category) {
      reset({
        categoryName: category?.name || '',
        desc: category?.desc || ''
      });
      setImage(category?.categoryImage || null);
      setDishImage(category?.categoryImage);
    } else {
      reset({
        categoryName: '',
        desc: ''
      });
      setImage(null);
    }
  }, [category, isEdit, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDishImage(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setDishImage(null);
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('categoryName', data?.categoryName);
    formData.append('desc', data?.desc);

    if (dishImage instanceof File) {
      formData.append('categoryImage', dishImage);
    } else if (dishImage === null) {
      formData.append('categoryImage', '');
    }

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
        setSnackbarMessage(isEdit ? t('Category updated successfully!') : t('Category added successfully!'));
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(isEdit ? t('Failed to update category!') : t('Failed to add category!'));
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(isEdit ? t('Error updating category!') : t('Error adding category!'));
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{isEdit ? t('Edit Category') : t('Add New Category')}</DialogTitle>
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
                  required: t('Category Name is required'),
                  maxLength: { value: 50, message: t('Category Name must be at most 50 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Category Name')}
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
                    return wordCount <= 200 || t('Description must be at most 200 words');
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Description')}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors?.desc}
                    helperText={errors?.desc ? errors?.desc?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('Upload Dish Image')}
              </Typography>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  {t('Choose Image')}
                </Button>
              </label>

              {image && (
                <div style={{ marginTop: '10px' }}>
                  <Typography variant="body2">
                    {dishImage?.name}
                    <Button size="small" color="secondary" onClick={handleRemoveImage} sx={{ ml: 2 }}>
                      {t('Remove')}
                    </Button>
                  </Typography>
                  <img
                    src={image}
                    alt={t('Dish preview')}
                    style={{ marginTop: '10px', width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              )}
              {errors?.dishImage && <Typography color="error">{errors?.dishImage?.message}</Typography>}
            </Grid>
          </Grid>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {t('Submit')}
            </Button>
            <Button onClick={onClose} color="secondary">
              {t('Cancel')}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
