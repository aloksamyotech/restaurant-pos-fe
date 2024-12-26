import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import {postApi} from 'core/apis/apiClient.js';

const AddExpensesTypeDialog = ({ open, onClose,fetchData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(); 

  
  const onSubmit =async (data) => {
    const formData = { ...data}; 
   
    const response = await postApi(urls?.expenseType?.create, formData); 
    
    fetchData();
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Add Expenses Type</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
             <Grid mt={1} item xs={12}>
              <Controller
                name="expenseName"
                control={control}
                defaultValue=""
                rules={{ required: 'Expense Name is required',
                    
                 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expense"
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

export default AddExpensesTypeDialog;
