import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi,updateApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const AddModifierDialog = ({ open, onClose, fetchData, table, setSnackbarMessage, setSnackbarOpen,isEdit }) => {
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
   useEffect(() => {
      if (isEdit && table) {
        reset({
          tableNumber: table?.tableNumber || '',
          space: table?.space || '',
          status: table?.status || ''
        });
       } else {
        reset({
          tableNumber: table?.tableNumber || '',
          space: table?.space || '',
          status: table?.status || ''
        });
       
      }
    }, [table, isEdit, reset]);


  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);


    try {
      let response;
      if (isEdit) {
      response = await updateApi(urls?.table?.update?.replace(':id', table?.id), formData);
      reset();
      } else {
        response = await postApi(urls?.table?.create, formData);
        reset();
      }
      if(response.success){
        fetchData();
       reset();
       onClose();
       setSnackbarMessage(isEdit ? t('Table updated successfully!') : t('Table added successfully!'));
       setSnackbarOpen(true);
      }
      else {
        setSnackbarMessage(isEdit ? t('Failed to update Table!') : t('Failed to add Table!'));
        setSnackbarOpen(true);
      }
     } catch (error) {
      console.error(error);
      setSnackbarMessage(isEdit ? t('Error updating Table!') : t('Error adding Table!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{isEdit ? t('Edit Table') : t('Add New Table')}</DialogTitle>
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
                rules={{
                  required: t('Space is required'),
                  max: {
                    value: 50,
                    message: t('Space must not be greater than 50'),
                  }
                 }}
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
                rules={{
                  required: t('Status is required')
                 }}
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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
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
