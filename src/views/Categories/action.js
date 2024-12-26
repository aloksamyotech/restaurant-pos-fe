import React,{ useState,useEffect }  from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
    Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import {updateApi} from 'core/apis/apiClient.js';

const EditDialog = ({ open, onClose,category,fetchData }) => {
  const { control, handleSubmit,formState: { errors },reset } = useForm(); 

  console.log(category);
  useEffect(() => {
    if (category) {
        reset({
          categoryName: category.name,

          desc: category.desc,
          isAvailable: category.true
        });
      }
    }, [category, reset]);

  

  const onSubmit =async(data) => {
    const formData = { ...data,id: category.id}; 
    
   
    const response = await updateApi(urls?.foodCategory?.update.replace(':id', category.id), formData);
    
   
    fetchData();
    onClose();
       
     
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle padding={0}>Edit New Modifier</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
             <Grid mt={1} item xs={12}>
              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                rules={{ required: 'Category Name is required' }}
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
              Edit Item
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
