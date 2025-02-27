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
import { updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { useTranslation } from 'react-i18next';

const EditModifierDialog = ({ open, onClose, modifier, fetchData, setSnackbarOpen, setSnackbarMessage }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "all"
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data, id: modifier?.id };
    setLoading(true);

    try {
      const response = await updateApi(urls?.modifier?.update?.replace(':id', modifier?.id), formData);

      if (response.success) {
        fetchData();
        setSnackbarMessage(t('Modifier edited successfully!'));
        setSnackbarOpen(true);
        onClose();
      } else {
        setSnackbarMessage(t('Error editing Modifier!'));
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(t('Error editing Modifier!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (modifier) {
      reset({
        name: modifier?.name,
        cost: modifier?.cost,
        price: modifier?.price,
        desc: modifier?.desc
      });
    }
  }, [modifier, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{t('Edit New Modifier')}</DialogTitle>
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
                rules={{ required: t('Modifier Name is required') }}
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
                  }
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
                  }
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
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
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
              {t('Edit Item')}
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

export default EditModifierDialog;
