import React, { useEffect, useState } from 'react';
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
  IconButton,
  Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { getApi, sentApi, postApi, updateApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelect from './multiDropDown';
import { useTranslation } from 'react-i18next';
import Loader from 'common/loader';
import Dummy_Image from '../../../src/assets/images/Dummy_Image.png';

const ItemDialog = ({ open, onClose, itemData, fetchData, setSnackbarOpen, setSnackbarMessage, isEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'all' });
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [image, setImage] = useState(null);
  const [dishImage, setDishImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name || '',
        cost: itemData?.cost || '',
        price: itemData?.price || '',
        desc: itemData?.desc || '',
        ingredient: itemData?.ingredientId?.map((ingredient) => ingredient?.name).join(', ') || '',
        itemCategoryId: itemData?.itemCategoryId || '',
        isAvailable: itemData?.isAvailable || false
      });
      setSelectedIngredients(itemData?.ingredientId || []);

      setImage(itemData.image || null);
    } else {
      reset({
        name: '',
        cost: '',
        price: '',
        desc: '',
        ingredient: '',
        itemCategoryId: '',
        isAvailable: false
      });
      setSelectedIngredients([]);
      setImage(null);
    }
  }, [itemData, reset]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await getApi(urls?.foodCategory?.get);
        setCategories(categoryResponse?.data);
      } catch (error) {
        setSnackbarMessage(t('Failed to load categories'));
        setSnackbarOpen(true);
      }
    };
    fetchDropdownData();
  }, []);

  const handleIngredientSelectionChange = (newSelected) => {
    setSelectedIngredients(newSelected);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('cost', data.cost);
    formData.append('price', data.price);
    formData.append('desc', data.desc);

    formData.append('categoryId', data.itemCategoryId);
    formData.append('ingredients', JSON.stringify(selectedIngredients));

    if (dishImage instanceof File) {
      formData.append('itemImage', dishImage);
    } else if (dishImage === null) {
      formData.append('itemImage', '');
    }

    setIsLoading(true);
    try {
      let response;
      if (isEdit) {
        formData.id = itemData?.id;
        response = await updateApi(urls?.item?.update?.replace(':id', itemData?.id), formData, {});
      } else {
        response = await sentApi(urls?.item?.create, formData, {});
      }

      if (response?.success) {
        fetchData();
        setSnackbarMessage(t(isEdit ? 'Item updated successfully!' : 'Item added successfully!'));
        setSnackbarOpen(true);
        reset();
        setImage(null);
        setSelectedIngredients([]);
        onClose();
      } else {
        setSnackbarMessage(t(isEdit ? 'Failed to update item!' : 'Failed to add item!'));
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
      <DialogTitle>{t(isEdit ? 'Edit Item' : 'Add Item')}</DialogTitle>
      <DialogContent>
        {isLoading && <Loader isVisible={isLoading}></Loader>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} marginTop={'1px'}>
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

            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Item Name is required'),
                  maxLength: { value: 50, message: t('Item Name must be at most 50 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Item Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.name}
                    helperText={errors?.name ? errors?.name?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
                  required: t('Cost is required'),
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: t('Invalid cost format')
                  },
                  validate: (value) => value >= 0 || t('Cost must be positive'),
                  maxLength: { value: 10, message: t('Cost must be at most 10 digits') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Cost')}
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
                  required: t('Price is required'),
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: t('Invalid price format')
                  },
                  validate: (value) => value >= 0 || t('Price must be positive'),
                  maxLength: { value: 10, message: t('Price must be at most 10 digits') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Price')}
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
              <MultipleSelect value={selectedIngredients} onSelectionChange={handleIngredientSelectionChange} />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="itemCategoryId"
                control={control}
                defaultValue=""
                rules={{ required: t('Category is required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Category')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.categoryId}
                    helperText={errors.categoryId ? errors.categoryId.message : ''}
                  >
                    {categories.map((type) => (
                      <MenuItem key={type._id} value={type._id}>
                        {t(type.categoryName)}
                      </MenuItem>
                    ))}
                  </TextField>
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
            <Button type="submit" variant="contained" color="primary">
              {t(isEdit ? 'Update' : 'Add')}
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

export default ItemDialog;
