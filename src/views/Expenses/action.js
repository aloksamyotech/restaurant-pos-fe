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
import { getApi } from 'core/apis/apiClient.js';
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
        name: tag?.name,
        desc: tag?.desc,
        amount: tag?.amount,
        expenseNameId: tag?.expenseNameId,
        expenseCategoryId: tag?.expenseCategoryId,
        isAvailable: tag?.true
      });
    }
  }, [tag, reset]);

  const [expenseTypes, setExpenseTypes] = useState([]);

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const response = await getApi(urls?.expenseType?.get);
        setExpenseTypes(response?.data);
      } catch (error) {
        console.error('Failed to fetch expense types:', error);
      }
    };

    fetchExpenseTypes();
  }, []);

  const onSubmit = async (data) => {
    const formData = { ...data, id: tag?.id };
    setLoading(true);

    try {
      const response = await updateApi(urls?.expense?.update?.replace(':id', tag?.id), formData);

      if (response.success) {
        fetchData();
        setSnackbarMessage('Expense edited successfully!');
        setSnackbarOpen(true);
        onClose();
      } else {
        setSnackbarMessage('Error editing Expense!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Error editing Expense!');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Expense Name is required',
                  maxLength: { value: 50, message: 'Expense must be at most 50 characters' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expense Name"
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
            <Grid item xs={12}>
              <Controller
                name="expenseCategoryId"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    error={!!errors.expenseNameId}
                    helperText={errors.expenseNameId ? errors.expenseNameId.message : ''}
                  >
                    {expenseTypes.map((type) => (
                      <MenuItem key={type._id} value={type._id}>
                        {type.expenseName}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                  required: 'amount is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid amount format'
                  },
                  validate: (value) => value >= 0 || 'amount must be positive',
                  maxLength: { value: 10, message: 'amount must be at most 10 digits' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.amount}
                    helperText={errors?.amount ? errors?.amount?.message : ''}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
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
