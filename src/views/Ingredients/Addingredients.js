import React, { useState } from 'react';
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
import { postApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { t } from 'i18next';
const AddIngredientDialog = ({ open, onClose, fetchData, setSnackbarMessage, setSnackbarOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });

  const [loading, setLoading] = useState(false);
  const currency = localStorage.getItem("$2b$10$ehdPSDmr6P1");

  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);

    try {
      const response = await postApi(urls?.ingredient?.create, formData);
      fetchData();
      reset();
      onClose();
      setSnackbarMessage(t('Ingredient added successfully!'));
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(t('Error adding Ingredient!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{t('Add New Ingredient')}</DialogTitle>
      <DialogContent>
        {loading && <Loader isVisible={loading}></Loader>}
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Ingredient Name is required'),
                  maxLength: { value: 50, message: t('Modifier Name must be at most 50 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Ingredient Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
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
                      startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
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
                  validate: (value) => value >= 0 || t('Cost must be positive'),
                  maxLength: { value: 10, message: t('Cost must be at most 10 digits') }
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
                      startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Quantity is required'),
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: t('Invalid quantity format')
                  },
                  validate: (value) => value >= 0 || t('Cost must be positive'),
                  maxLength: { value: 10, message: t('Cost must be at most 10 digits') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Qty')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.quantity}
                    helperText={errors?.quantity ? errors?.quantity?.message : ''}
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="unit"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Unit is required')
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Unit')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.unit}
                    helperText={errors?.unit ? errors?.unit.message : ''}
                  >
                    {['kg', 'ltr', 'pieces'].map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {t(unit)}
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

export default AddIngredientDialog;
