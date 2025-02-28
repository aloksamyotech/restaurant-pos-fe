import React, { useState, useEffect } from 'react';
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
  IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { getApi, updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelect from './multiDropDown';
import { useTranslation } from 'react-i18next';

const EditDialog = ({ open, onClose, tag, fetchData, setSnackbarOpen, setSnackbarMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'all'
  });
  const [categories, setCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (tag) {
      reset({
        name: tag?.name,
        cost: tag?.cost,
        price: tag?.price,
        desc: tag?.desc,
        ingredient: tag?.ingredientId?.map((ingredient) => ingredient?.name).join(', ') || 'N/A',
        categoryId: tag?.categoryId?.categoryName,
        itemCategoryId: tag?.itemCategoryId,
        isAvailable: tag?.true
      });
      setSelectedIngredients(tag?.ingredientId?.map((ingredient) => ingredient?._id) || []);
    }
  }, [tag, reset]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await getApi(urls?.foodCategory?.get);

        setCategories(categoryResponse?.data);
      } catch (error) {
        setSnackbarMessage(t('Failed to load dropdown data'));
        setSnackbarOpen(true);
      }
    };
    fetchDropdownData();
  }, []);

  const handleIngredientSelectionChange = (selectedValues) => {
    setSelectedIngredients(selectedValues);
  };

  const onSubmit = async (data) => {
    const formData = { ...data, id: tag?.id, ingredientIds: selectedIngredients };

    const response = await updateApi(urls?.item?.update?.replace(':id', tag?.id), formData);

    if (response?.success) {
      fetchData();
      setSnackbarMessage(t('Edited successfully!'));
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage(t('Failed to edit !'));
      setSnackbarOpen(true);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Edit Item')}</DialogTitle>
      <DialogContent>
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
            <Grid mt={1} item xs={12}>
              <Controller
                name={t('desc')}
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
                name={t('price')}
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
                    label={t('Price"')}
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
              <MultipleSelect onSelectionChange={handleIngredientSelectionChange} />
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
                        {type.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
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

export default EditDialog;
