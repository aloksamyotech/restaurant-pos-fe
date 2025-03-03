import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { useTranslation } from 'react-i18next';

const AddExpensesTypeDialog = ({ open, onClose, fetchData, setSnackbarMessage, setSnackbarOpen }) => {
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
      const response = await postApi(urls?.expenseType?.create, formData);

      fetchData();
      reset();
      onClose();
      setSnackbarMessage(t('Expense Type added successfully!'));
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(t('Error adding Expense Type!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{t('Add Expenses Type')}</DialogTitle>
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
                name="expenseName"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Expense Name is required'),
                  maxLength: { value: 50, message: t('Expense must be at most 50 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Expense')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.expenseName}
                    helperText={errors.expenseName ? errors.expenseName.message : ''}
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

export default AddExpensesTypeDialog;
