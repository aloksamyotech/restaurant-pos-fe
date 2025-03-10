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


const SingleKitchenOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [itemRow, setItemRow] = useState([]);
  const [kitchenOrderData, setKitchenOrderData] = useState([]);
  const [latestItemCompeted, setCheckboxItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState('');
  const [rows, setRows] = useState([]);
  const [orderidForupdate, setorderidForupdate] = useState();
  const [isChefAssigned, setIsChefAssigned] = useState(false);

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

      if (orderId) {
        const orderResponse = await getApi(urls?.order?.getbyid?.replace(':id', orderId));
        const items = orderResponse?.data?.items || [];

        const formattedItemRows = items.map((item, index) => ({
          id: index + 1,
          serial: index + 1,
          items: item?.name || t('N/A'),
          itemId: item?.id,
          quantity: item?.quantity || '0',
          completedPercentage: latestItemCompeted.includes(item?.id) ? 100 : 0
        }));

        setItemRow(formattedItemRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleCheckboxChange = async (orderId, ItemId, currentStatus) => {
    try {
      let updatedItemCompeted = [...latestItemCompeted];

      if (currentStatus === 0) {
        updatedItemCompeted.push(ItemId);
      } else {
        updatedItemCompeted = updatedItemCompeted.filter((id) => id !== ItemId);
      }
      const totalItems = itemRow.length;
      const completedItems = updatedItemCompeted.length;

      const newCompletedPercentage = (completedItems / totalItems) * 100;

      await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', orderId), {
        completedPercentage: newCompletedPercentage,
        itemCompeted: updatedItemCompeted,
        status: newCompletedPercentage === 0
          ? 'Pending'
          : newCompletedPercentage === 100
            ? 'Completed'
            : 'In Progress'
      });

      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const checkbox = (itemId) => {
    return latestItemCompeted.includes(itemId);
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
        status: 'In Progress'
      });


      setOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error assigning chef:', error);
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
          checked={checkbox(params?.row?.itemId)}
          onChange={() => handleCheckboxChange(id, params?.row?.itemId, params?.row?.completedPercentage)}
          style={{ width: '15px', height: '15px' }}
        />
      )
    }
  ];

  return (
    <Container>
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
            <Box sx={{ width: '100%', }}>
              <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'rgb(33,150,243)', color: 'white', }}>
                <CardContent>

                  <Typography variant="body1">
                    <strong>{t('Order Id')}:</strong> ORD-${kitchenOrderData?.order?._id?.substring(0, 6)}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Order Type')}:</strong>
                    {kitchenOrderData?.order?.type}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Completed Percentage')}:</strong>{`${kitchenOrderData?.completedPercentage?.toFixed(2)}%`}

                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={6} >


            <Box sx={{ width: '100%' }} >
              <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'rgb(33,150,243)', color: 'white', }}>
                <CardContent>

                  <Typography variant="body1">
                    <strong>{t('Status')}:</strong> {kitchenOrderData?.status}
                  </Typography>
                 

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Chef')}:</strong>{kitchenOrderData?.chef?.firstName}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Table No.')}:</strong> {kitchenOrderData?.table}
                  </Typography>

                </CardContent>


              </Card>

            </Box>

          </Grid>


        </Grid>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>


          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            {isChefAssigned ? 'Update Chef' : 'Assign Chef'}
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            {t('Add Extra Items')}
          </Button>
          
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
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle >{t('Select a Chef')}</DialogTitle>
        <DialogContent  >
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
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="chef-label">{t('Select Chef')}</InputLabel>
            <Select
              value={selectedChef}
              onChange={(e) => setSelectedChef(e.target.value)}
              labelId="chef-label"
              label={t('Select Chef')}

            >

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
          <Button variant="contained" color="primary" onClick={handleAssignChef} >
            {t('Assign')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SingleKitchenOrder;
