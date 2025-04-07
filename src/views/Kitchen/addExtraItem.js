import {
    Button,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    Select,
    MenuItem,
    DialogActions,
    IconButton,
    InputLabel,
    FormControl,
    Grid,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { t } from 'i18next';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { urls } from 'core/constant/urls';
import { getApi, updateApi, updateApiPatch } from 'core/apis/apiClient.js';
import { useEffect } from 'react';


const AddExtraItem = ({ open, onClose, orderId, setSnackbarOpen, setSnackbarMessage, fetchindex, statusCompletedItems, id }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'all'
    });

    const [rows, setRows] = useState([]);
    const fetchData = async () => {
        const response = await getApi(urls?.item?.get);

        setRows(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const onSubmit = async (data) => {
        const formData = { ...data, id: orderId };

        const response = await updateApi(urls?.order?.update?.replace(':id', orderId), formData);

        const totalItems = response?.data?.items?.length || 1;
        const newCompletedPercentage = (statusCompletedItems / totalItems) * 100;


        if (response?.success) {
            await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', id), {
                completedPercentage: newCompletedPercentage,
            })

            fetchData();
            fetchindex();
            setSnackbarMessage(t('Extra Item Added Successfully!'));
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage(t('Failed to Add Extra Item !'));
            setSnackbarOpen(true);
        }
        reset();
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>{t('Add Extra Items')}</DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} marginTop={'1px'}>
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

                            <Grid item xs={12}>
                                <Controller
                                    name="items"
                                    control={control}

                                    rules={{ required: 'Item is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Items"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.item}
                                            helperText={errors.item ? errors.item.message : ''}
                                        >
                                            {rows.map((type) => (
                                                <MenuItem key={type._id} value={type._id}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            <Grid mt={1} item xs={12}>
                                <Controller
                                    name="quantity"
                                    control={control}

                                    rules={{
                                        required: t('Quantity is required'),
                                        pattern: {
                                            value: /^\d+(\.\d{1,2})?$/,
                                            message: t('Invalid quantity format')
                                        },
                                        validate: (value) => value >= 0 || t('Cost must be positive'),
                                        maxLength: { value: 10, message: t('Cost must be at most 10 digits') }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('Qty')}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors?.quantity}
                                            helperText={errors?.quantity ? errors?.quantity?.message : ''}
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={onClose}>{t('Cancel')}</Button>
                            <Button type="submit" variant="contained" color="primary"  >
                                {t('Submit')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    );
};
export default AddExtraItem;