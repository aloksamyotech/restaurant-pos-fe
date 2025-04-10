import React, { useState, useEffect } from 'react';
import {
  Stack,
  Container,
  Typography,
  Card,
  Box,
  Grid,
  Breadcrumbs,
  Link,
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
  FormControl
} from '@mui/material';
import Iconify from '../../ui-component/iconify';
import { getApi, updateApiPatch } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router';
import { t } from 'i18next';
import CloseIcon from '@mui/icons-material/Close';
import AddExtraItem from './addExtraItem';
import { Snackbar } from '@mui/material';
import { enums } from 'core/constant/constant';
import LinearWithValueLabel from './progressBar';
import HandleStatus from './handleStatus';

const SingleKitchenOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [itemRow, setItemRow] = useState([]);
  const [kitchenOrderData, setKitchenOrderData] = useState([]);
  const [latestItemCompeted, setCheckboxItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState('');
  const [rows, setRows] = useState([]);
  const [orderidForupdate, setorderidForupdate] = useState();
  const [isChefAssigned, setIsChefAssigned] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [statusCompletedItems, setStatusCompletedItems] = useState();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" onClick={() => navigate('/dashboard/kitchen')} sx={{ cursor: 'pointer' }}>
      {t('Kitchen')}
    </Link>
  ];

  const fetchData = async () => {
    try {
      const response = await getApi(urls?.kitchen?.getSingleOrder?.replace(':id', id));
      setKitchenOrderData(response?.data);

      if (!response?.data?.chef) {
        setIsChefAssigned(false);
      } else {
        setIsChefAssigned(true);
      }
      const latestItemCompeted = response?.data?.itemCompeted || [];
      setCheckboxItem(latestItemCompeted);

      const orderId = response?.data?.order?._id;
      setorderidForupdate(orderId);

      if (orderId) {
        const orderResponse = await getApi(urls?.order?.getbyid?.replace(':id', orderId));
        const items = orderResponse?.data?.items || [];
        const formattedItemRows = items.map((item, index) => ({
          id: index + 1,
          serial: index + 1,
          items: item?.name || t('N/A'),
          itemId: item?.id,
          quantity: item?.quantity || '0',
          completedPercentage: latestItemCompeted.includes(item?.serial) ? 100 : 0
        }));

        setItemRow(formattedItemRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
const handleCheckboxChange = async (serial, orderId) => {
    try {
      if (!kitchenOrderData?.chef?.firstName) {
        setSnackbarMessage(t('First Assign Chef'));
        setSnackbarOpen(true);
        setOpen(false);
        return; 
      }
      let updatedItemCompeted = latestItemCompeted.includes(serial)
        ? latestItemCompeted.filter((s) => s !== serial)
        : [...latestItemCompeted, serial];

      const totalItems = itemRow?.length || 1;
      const completedItems = updatedItemCompeted.length || 0;

      setStatusCompletedItems(completedItems);
      const newCompletedPercentage = (completedItems / totalItems) * 100;
      fetchData();
      if (kitchenOrderData?.chef?.firstName) {
        await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', orderId), {
          completedPercentage: newCompletedPercentage,
          itemCompeted: updatedItemCompeted
        });

        fetchData();
      } else {
        setSnackbarMessage(t('First Assign Chef'));
        setSnackbarOpen(true);
        setOpen(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchData();
    }, []);

  const checkbox = (serial) => {
    return latestItemCompeted.includes(serial);
  };

  const fetchChef = async () => {
    const response = await getApi(urls?.employee?.get);
    const formattedData = response?.data?.map((item, index) => ({
      firstName: item?.firstName,
      role: item?.role,
      _id: item?._id
    }));

    setRows(formattedData);
  };
  useEffect(() => {
    fetchChef();
  }, []);

  const handleAssignChef = async () => {
    if (!selectedChef) return;
    try {
      const response = await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', id), {
        chef: selectedChef,
        status: 'In progress'
      });
      if (response.success) {
        setSnackbarMessage(t('Chef Assign successfully!'));
        setSnackbarOpen(true);
        setOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error assigning chef:', error);
      setSnackbarMessage(t('Error Assigning Chef!'));
      setSnackbarOpen(true);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const columns = [
    {
      field: 'serial',
      headerName: t('S.No'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'items',
      headerName: t('Item Name'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'quantity',
      headerName: t('Quantity'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'completedPercentage',
      headerName: t('Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={checkbox(params?.row?.serial)}
          onChange={() => handleCheckboxChange(params?.row?.serial, id)}
          style={{ width: '15px', height: '15px' }}
        />
      )
    }
  ];

  return (
    <Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <Card sx={{ p: 2, mb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> {t('Kitchen Orders')}
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Box sx={{ width: '100%', bgcolor: 'white' }}>
        <Grid container padding={2} spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ width: '100%' }}>
              <Card sx={{ border: '2px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>{t('Order ID')}:</strong> {kitchenOrderData?.order?._id?.substring(19, 24)}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Order Type')}:</strong>
                    {kitchenOrderData?.order?.type}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Completed Percentage')}:</strong>
                    {`${kitchenOrderData?.completedPercentage?.toFixed(2)}%`}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ width: '100%' }}>
              <Card sx={{ border: '2px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>{t('Status')}:</strong> {kitchenOrderData?.status}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Chef')}:</strong>
                    {kitchenOrderData?.chef?.firstName}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Table No.')}:</strong> {kitchenOrderData?.table}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Typography sx={{ marginLeft: 5 }}>{t('Order Complete Percentage')}</Typography>
        <Box sx={{ p: 1 }}>
          {' '}
          <LinearWithValueLabel completedPercentage={kitchenOrderData?.completedPercentage} />
        </Box>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <HandleStatus
            kitchenId={id}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            fetchData={fetchData}
            orderId={orderidForupdate}
          />
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            {isChefAssigned ? t(enums?.UpdateChef) : t(enums?.AssignChef)}
          </Button>
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            {t('Add Extra Item')}
          </Button>

          <AddExtraItem
            open={dialogOpen}
            onClose={handleDialogClose}
            orderId={orderidForupdate}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            fetchindex={fetchData}
            statusCompletedItems={statusCompletedItems ?? 0}
            id={id}
          />
        </Box>

        <Card>
          <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
              rows={itemRow}
              columns={columns}
              components={{
                Pagination: () => null
              }}
            />
          </Box>
        </Card>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}  >
        <DialogTitle>{t('Select a Chef')}</DialogTitle>
        <DialogContent>
          <IconButton
            onClick={() => setOpen(false)}
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
          <FormControl fullWidth sx={{ mt: 1, minWidth:"300px" }}>
            <InputLabel id="chef-label">{t('Select Chef')}</InputLabel>
            <Select value={selectedChef} onChange={(e) => setSelectedChef(e.target.value)} labelId="chef-label" label={t('Select Chef')}>
              {rows
                .filter((chef) => chef.role === 'Chef')
                .map((chef, index) => (
                  <MenuItem key={index} value={chef._id}>
                    {t(chef.firstName)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
          <Button variant="contained" color="primary" onClick={handleAssignChef}>
            {t('Assign')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SingleKitchenOrder;
