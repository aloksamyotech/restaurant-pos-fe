import React,{ useState,useEffect }  from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
    Button, Grid, MenuItem, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { urls } from "core/constant/urls";
import {updateApi} from 'core/apis/apiClient.js';

const EditDialog = ({ open, onClose,tag }) => {
  const { control, handleSubmit,formState: { errors },reset } = useForm(); 

  useEffect(() => {
    if (tag) {
        reset({
          name: tag.name,
          desc: tag.desc,
          isAvailable: tag.true
        });
      }
    }, [tag, reset]);

  

  const onSubmit =async(data) => {
    const formData = { ...data,id: tag.id}; 
    console.log("form data========" + formData); 
    console.log("response========" +urls?.expenseType?.update.replace(':id', tag.id));
    const response = await updateApi(urls?.expenseType?.update.replace(':id', tag.id), formData);
    
    console.log(response); 
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
