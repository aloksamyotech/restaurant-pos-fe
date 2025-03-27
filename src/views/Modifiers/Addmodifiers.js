import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, InputAdornment, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddModifierDialog = ({ open, onClose, fetchData, setRows, setSnackbarMessage, setSnackbarOpen }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });
  const currency = localStorage.getItem("$2b$10$ehdPSDmr6P1");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);

    try {
      const response = await postApi(urls?.modifier?.create, formData);

      fetchData();
      reset();
      onClose();
      setSnackbarMessage(t('Modifier added successfully!'));
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(t('Error adding Modifier!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{t('Add New Modifier')}</DialogTitle>
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
                  required: t('Modifier Name is required'),
                  maxLength: { value: 50, message: t('Modifier Name must be at most 50 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Modifier Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
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
                    error={!!errors.cost}
                    helperText={errors.cost ? errors.cost.message : ''}
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
                    error={!!errors.price}
                    helperText={errors.price ? errors.price.message : ''}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
                    }}
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

export default AddModifierDialog;
