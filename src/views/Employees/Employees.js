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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
  IconButton,
  InputAdornment,
  Select,
  InputLabel,
  Snackbar
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import Loader from 'common/loader';
import { urls } from 'core/constant/urls';
import { postApi, updateApi } from 'core/apis/apiClient.js';
import { useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { t } from 'i18next';
import currencyCodes from "currency-codes"
import currencySymbolMap from "currency-symbol-map";
import { getUserInfoFromToken } from 'core/apis/common';

const AddUser = ({ open, onClose, fetchData, employeeData = {}, editMode = false }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
 
  
  const {
    control,
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const values = getUserInfoFromToken();
 
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const currencyOptions = currencyCodes.data.map((currency) => ({
    code: currency.code,
    name: currency.currency,
    symbol: currencySymbolMap(currency.code),
  }));

  useEffect(() => {
    if (editMode && employeeData) {
      reset(employeeData);
    }
  }, [editMode, employeeData, reset]);

  const onSubmit = async (data) => {
    const formData = { ...data };
    setLoading(true);

    try {
      let response;
      if (editMode) {
        response = await updateApi(urls?.employee?.update.replace(':id', employeeData?._id), formData);
      
        if (response.success===true && data?.currency) {
          localStorage.setItem('$2b$10$ehdPSDmr6P1', data?.currency);
}
        
  } else {
        response = await postApi(urls?.employee?.create, formData);
      }
      fetchData();
      reset();
      onClose();
      const successMessage = editMode ? t('Employee updated successfully!') : t('Employee added successfully!');
    setSnackbarMessage(successMessage);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(editMode ? t('Employee updated successfully!') : t('Employee added successfully!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
     
    }
  };

  return (
  
  <> <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000}
    message={snackbarMessage}
    onClose={() => setSnackbarOpen(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  />
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>{editMode ? t('Edit Employee') : t('Add New Employee')}</DialogTitle>
      <DialogContent>
        {loading && <Loader isVisible={loading}></Loader>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid mt={'0.5px'} container spacing={2}>
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
            <Grid item xs={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: t('First Name is required'),

                  maxLength: { value: 20, message: t('First Name must be at most 20 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('First Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.firstName}
                    helperText={errors?.firstName ? errors?.firstName?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: t('Last Name is required'),
                  maxLength: { value: 20, message: t('Last Name must be at most 20 characters') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Last Name')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.lastName}
                    helperText={errors?.lastName ? errors?.lastName?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: t('Phone Number is required'),
                  pattern: { value: /^[0-9]{10}$/, message: t('Phone Number must be exactly 10 digits and contain only numbers') }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Phone Number')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.phoneNumber}
                    helperText={errors?.phoneNumber ? errors?.phoneNumber?.message : ''}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: t('Email is required'),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t('Please enter a valid email address')
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Email')}
                    variant="outlined"
                    fullWidth
                    error={!!errors?.email}
                    helperText={errors?.email ? errors?.email?.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: t('Role is required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Role')}
                    variant="outlined"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role ? errors.role.message : ''}
                  >
                    <MenuItem value="Manager">{t('Manager')}</MenuItem>
                    <MenuItem value="OrderTaker">{t('Order Taker')}</MenuItem>
                    <MenuItem value="Chef">{t('Chef')}</MenuItem>
                    <MenuItem value="superAdmin">{t('superAdmin')}</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            {!editMode && (
              <Grid item xs={6}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: t('Password is required'),
                    minLength: {
                      value: 6,
                      message: t('Password must be at least 6 characters long')
                    },
                    maxLength: {
                      value: 15,
                      message: t('Password must not exceed 15 characters')
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('Password')}
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      error={!!errors?.password}
                      helperText={errors?.password ? errors?.password?.message : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: t('Gender is required') }}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors?.gender}>
                    <FormLabel component="legend">{t('Gender')}</FormLabel>
                    <RadioGroup {...field} row>
                      <FormControlLabel value="Male" control={<Radio />} label={t('Male')} />
                      <FormControlLabel value="Female" control={<Radio />} label={t('Female')} />
                      <FormControlLabel value="Other" control={<Radio />} label={t('Other')} />
                    </RadioGroup>
                    <FormHelperText>{errors?.gender?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            {(watch('role') === 'superAdmin' && (
              <Grid item xs={12} sm={6}>

                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    
                    <FormControl fullWidth>
          <InputLabel>{t('Currency')}</InputLabel>
                      
                    <Select {...field} label={t('Currency')}>
                      {currencyOptions.map((currency) => (
                        <MenuItem key={currency.symbol} value={currency.symbol}>
                          {currency.name} - {currency.code}-{currency.symbol}
                        </MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                    
                  )}
                />
              </Grid>
            ))}


            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: t('Address is required'),
                  maxLength: {
                    value: 100,
                    message: t('Address must not exceed 100 characters')
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Address')}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors?.address}
                    helperText={errors?.address ? errors?.address?.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {editMode ? t('Update Employee') : t('Add Employee')}
            </Button>
            <Button onClick={onClose} color="secondary">
              {t('Cancel')}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
    </> 
  );
};

export default AddUser;
