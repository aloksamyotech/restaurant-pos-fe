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
  IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

const AddUser = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data };

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Employee</DialogTitle>
      <DialogContent>
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
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
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
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => <TextField {...field} label="Last Name" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: 'Phone Number is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.phoneNumber}
                    helperText={errors?.phoneNumber ? errors?.phoneNumber?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
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
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    variant="outlined"
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role ? errors.role.message : ''}
                  >
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Order Taker">Order Taker</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors?.password}
                    helperText={errors?.password ? errors?.password?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: 'Gender is required' }}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors?.gender}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup {...field} row>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <FormHelperText>{errors?.gender?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Address is required'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
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
            <Button type="submit" variant="contained" color="primary">
              Add Employee
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

export default AddUser;
