import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import {postApi} from 'core/apis/apiClient.js';


const AddModifierDialog = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  

  const onSubmit =async(data) => {
    const formData = { ...data}; 
    console.log(formData); 
    const response = await postApi(urls?.modifier?.create, formData);
       
     
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Modifier</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
             <Grid mt={1} item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Modifier Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Modifier Name"
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
                  required: 'Cost is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid cost format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cost"
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
                  required: 'Price is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid price format'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
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
          <Button type="submit" variant="contained" color="primary" onClick={onClose}>
              Add Item
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

export default AddModifierDialog;
