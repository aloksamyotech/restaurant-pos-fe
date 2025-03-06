import React, { useState, useEffect } from 'react';
import { Stack, Container, Typography, Card, Box, Grid, Breadcrumbs, Link, Tab, Tabs, Divider, CardContent, Button } from '@mui/material';

import Iconify from '../../ui-component/iconify';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Invoice from 'views/POS/Components/invoice';
import { t } from 'i18next';

const OrderView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" onClick={() => navigate('/dashboard/order')} sx={{ cursor: 'pointer' }}>
      {t('Orders')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Orders')}
    </Typography>
  ];

  const [rowData, setrowdata] = useState({});
  const [invoiceID, setinvoiceID] = useState();

  const fetchData = async () => {
    const response = await getApi(urls?.order.getbyid.replace(':id', id));

    const order = response?.data;

    const formattedData = {
      id: order?._id,
      customer: order?.customer || t('N/A'),
      employee: order?.employee || t('N/A'),
      totalPrice: order?.totalPrice?.toFixed(2) || '0.00',
      discount: order?.discount?.toFixed(2) || '0.00',
      tax: order?.tax?.toFixed(2) || '0.00',
      paymentStatus: t('Paid'),
      chef: order?.chef || t('N/A'),
      type: order?.type || t('N/A'),
      status: order?.status || t('Pending'),
      expectedTime: order?.expectedTime ? `${order.expectedTime} ${t('min')}` : t('N/A')
    };
    const formattedItemRows =
      order?.items?.map((item, index) => ({
        id: index + 1,
        serial: index + 1,
        items: item?.name || t('N/A'),
        price: item?.price?.toFixed(2) || '0.00',
        quantity: item?.quantity || '0'
      })) || [];

    setrowdata(formattedData);
    setitemRow(formattedItemRows);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchDataByOrderId = async () => {
    const response = await getApi(urls?.invoice?.getbyorderid.replace(':id', id));

    const invoice = response?.data._id;

    setinvoiceID(invoice);
  };

  useEffect(() => {
    fetchDataByOrderId();
  }, [id]);

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
      field: 'price',
      headerName: t('Price'),
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
    }
  ];

  const [itemRow, setitemRow] = useState([]);

  return (
    <Container sx={{}}>
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
        <Tabs variant="scrollable" value={tabValue} onChange={handleChange}>
          <Tab value={0} label={t('Order')} />
          <Tab value={1} label={t('Invoice')} />
        </Tabs>
        <Divider sx={{ borderColor: 'grey.300' }} />
        {tabValue === 0 && (
          <>
            <Grid container padding={2} spacing={3}>
              <Grid item xs={6}>
                <Box sx={{ width: '100%' }}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ textAlign: 'left', mb: 1 }}>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          <strong>{t('Customer')}:</strong>
                          {}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        <strong>{t('Employee')}:</strong> {}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('totalPrice')}:</strong> {rowData?.totalPrice}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Discount')}:</strong> {rowData?.discount}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Tax')}:</strong> {}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ width: '100%' }}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Payment Status')}:</strong>{' '}
                        <Button variant="contained" size="small" color="success" sx={{ textTransform: 'none' }}>
                          {rowData?.paymentStatus}
                        </Button>
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography mt={1} variant="body1">
                          <strong>{t('Status')}:</strong> {}
                        </Typography>
                      </Box>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Expected Time')}:</strong>
                      </Typography>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Chef')}:</strong>
                      </Typography>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>{t('Table Type')}:</strong>
                      </Typography>
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
          </>
        )}
      </Box>
      {tabValue === 1 && <Invoice invoiceId={invoiceID} />}
    </Container>
  );
};

export default OrderView;
