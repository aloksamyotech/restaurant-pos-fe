import * as React from 'react';
import Palette from '../../ui-component/ThemePalette';
import { FormControl, FormHelperText, FormLabel, Grid, Typography, Button, Dialog, Input } from '@mui/material';
import { DialogContent, DialogActions, DialogTitle } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { sentApi } from 'core/apis/apiClient';
import { urls } from 'core/constant/urls';
import { useTranslation } from 'react-i18next';
import itemSampleFile from 'assets/sampleFile/itemSampleFile.xlsx';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Loader from 'common/loader';

const BulkUploadCategory = (props) => {
  const { t } = useTranslation();
  const { open, onClose, setSnackbarMessage, setSnackbarOpen, fetchData } = props;
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
      const response = await sentApi(urls?.item?.bulkUpload, formData);
      fetchData();
      reset();
      onClose();
      setSnackbarMessage(t('Items BulkUpload added successfully!'));
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(t('Error adding Items BulkUpload!'));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6">{t('Add Bulk Category Data')}</Typography>
        <Typography>
          <ClearIcon onClick={onClose} style={{ cursor: 'pointer' }} />
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {loading && <Loader isVisible={loading}></Loader>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} rowSpacing={4} direction="column">
            <Grid item>
              <Typography sx={{ display: 'inline', marginRight: '10px' }}>Download Sample File</Typography>
              <Typography
                color="primary"
                onClick={() => window.open(itemSampleFile, '_blank')}
                sx={{ display: 'inline', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
              >
                Click here!
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <FormLabel>{t('Upload File')}*</FormLabel>
                <Controller
                  name="file"
                  control={control}
                  rules={{ required: 'File is required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept=".xls,.xlsx,.csv"
                      size="small"
                      onChange={(event) => onChange(event?.target?.files[0])}
                      error={!!error}
                    />
                  )}
                />
                <FormHelperText sx={{ color: Palette.error.main }}>{errors?.file?.message}</FormHelperText>
              </FormControl>
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
export default BulkUploadCategory;
