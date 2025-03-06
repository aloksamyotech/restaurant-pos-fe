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
  DialogActions
} from '@mui/material';
import Iconify from '../../ui-component/iconify';
import { getApi, updateApiPatch } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router';
import { t } from 'i18next';

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

      const latestItemCompeted = response?.data?.itemCompeted || [];
      setCheckboxItem(latestItemCompeted);

      const orderId = response?.data?.order;

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
        itemCompeted: updatedItemCompeted
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
      await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', id), {
        chef: selectedChef
      });
      fetchData();
      setOpen(false);
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
        />
      )
    }
  ];

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> {t('Orders')}
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Grid container padding={2} spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ width: '100%' }}>
              <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>{t('Customer')}:</strong>
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t('Employee')}:</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Total Price')}:</strong> {kitchenOrderData?.totalPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ width: '100%' }}>
              <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography mt={1} variant="body1">
                      <strong>{t('Status')}:</strong> {kitchenOrderData?.status}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Chef')}:</strong>
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{t('Table Type')}:</strong> {kitchenOrderData?.table}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    {t('Assign Chef')}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('Select a Chef')}</DialogTitle>
        <DialogContent>
          <Select fullWidth value={selectedChef} onChange={(e) => setSelectedChef(e.target.value)}>
            {rows
              .filter((chef) => chef.role === 'Chef')
              .map((chef, index) => (
                <MenuItem key={index} value={chef._id}>
                  {t(chef.firstName)}
                </MenuItem>
              ))}
          </Select>
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
