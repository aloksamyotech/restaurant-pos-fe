import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import {postApi} from 'core/apis/apiClient.js';


const AddCategoryDialog = ({ open, onClose,fetchData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  
  const onSubmit =async (data) => {
    const formData = { ...data}; 
    console.log(formData);
    
    const response = await postApi(urls?.foodCategory?.create, formData);
    fetchData();
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add New Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
             <Grid mt={1} item xs={12}>
              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                rules={{ required: 'Category Name is required',
                  maxLength: { value: 50, message: 'Category Name must be at most 50 characters' }
                 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.categoryName}
                    helperText={errors.categoryName ? errors.categoryName.message : ''}
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
                  validate: value => {
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

export default AddCategoryDialog;
