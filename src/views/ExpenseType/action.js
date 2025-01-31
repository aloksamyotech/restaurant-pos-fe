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

const EditDialog = ({ open, onClose, tag, fetchData, setSnackbarOpen, setSnackbarMessage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tag) {
      reset({
        expenseName: tag?.expenseName,
        desc: tag?.desc,
        isAvailable: tag.true
      });
    }
  }, [tag, reset]);

  const onSubmit = async (data) => {
    const formData = { ...data, id: tag?.id };
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await updateApi(urls?.expenseType?.update.replace(':id', tag?.id), formData);
        if (response.success) {
          fetchData();
          setSnackbarMessage('Expense Type edited successfully!');
          setSnackbarOpen(true);
          onClose();
        } else {
          setSnackbarMessage('Error editing Expense Type!');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error(error);
        setSnackbarMessage('Error editing Expense Type!');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Edit New Modifier</DialogTitle>
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
                  required: 'Expense Type is required',
                  maxLength: { value: 50, message: 'Expense Type must be at most 50 characters' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expense Type"
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
