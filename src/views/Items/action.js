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
  Typography,
  IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { getApi, updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelect from './multiDropDown';

const EditDialog = ({ open, onClose, tag, fetchData, setSnackbarOpen, setSnackbarMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  useEffect(() => {
    if (tag) {
      reset({
        name: tag?.name,
        cost: tag?.cost,
        price: tag?.price,
        desc: tag?.desc,
        ingredient: tag?.ingredientId?.map((ingredient) => ingredient?.name).join(', ') || 'N/A',
        categoryId: tag?.categoryId.categoryName,
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
        setSnackbarMessage('Failed to load dropdown data');
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
      setSnackbarMessage('Edited successfully!');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Failed to edit !');
      setSnackbarOpen(true);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
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
                rules={{ required: 'Item Name is required', maxLength: { value: 50, message: 'Item Name must be at most 50 characters' } }}
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
                  validate: (value) => value >= 0 || 'Price must be positive',
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
              <MultipleSelect
                // value={selectedIngredients}
                onSelectionChange={handleIngredientSelectionChange}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="itemCategoryId"
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

export default EditDialog;
