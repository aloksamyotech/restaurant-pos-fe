import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, InputAdornment, IconButton, MenuItem } from '@mui/material';
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);

    try {
      const response = await postApi(urls?.table?.create, formData);

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
      <DialogTitle padding={0}>{t('Add New Table')}</DialogTitle>
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
                name="tableNumber"
                control={control}

                rules={{
                  required: t('Table Name is required'),
                  maxLength: { value: 25, message: t('Table Name must be at most 25 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Table Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.tableNumber}
                    helperText={errors.tableNumber ? errors.tableNumber.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="space"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Space')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.space}
                    helperText={errors.space ? errors.space.message : ''}
                    type="number"

                  />
                )}
              />
            </Grid>



            <Grid mt={1} item xs={12}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Status')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status ? errors.status.message : ''}
                  >
                    <MenuItem value="Vacant">{t('Vacant')}</MenuItem>
                    <MenuItem value="Occupied">{t('Occupied')}</MenuItem>
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

export default AddModifierDialog;
