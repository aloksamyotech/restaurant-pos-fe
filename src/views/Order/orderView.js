import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Box,
  TextField,
  Checkbox,
  IconButton,
  Grid,
  Breadcrumbs,
  Link,
  Tab,
  Tabs,
  Divider,
  CardContent
} from '@mui/material';

import Iconify from '../../ui-component/iconify';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';

import { useParams } from 'react-router';
import Invoice from 'views/POS/Components/invoice';

const OrderView = () => {
  const { id } = useParams();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/" onClick={handleClick}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" href="/material-ui/getting-started/installation/" onClick={handleClick}>
      Orders
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Orders
    </Typography>
  ];
  function handleClick(event) {
    event?.preventDefault();
  }

  const [rowData, setrowdata] = useState({});
  const [invoiceID, setinvoiceID] = useState();

  const fetchData = async () => {
    const response = await getApi(urls?.order.getbyid.replace(':id', id));

    const order = response?.data;

    const formattedData = {
      id: order?._id,
      customer: order?.customer || 'N/A',
      employee: order?.employee || 'N/A',
      totalPrice: order?.totalPrice?.toFixed(2) || '0.00',
      discount: order?.discount?.toFixed(2) || '0.00',
      tax: order?.tax?.toFixed(2) || '0.00',
      paymentStatus: order?.paymentStatus === 1 ? 'Paid' : 'Unpaid',
      chef: order?.chef || 'N/A',
      type: order?.type || 'N/A',
      status: order?.status || 'Pending',
      expectedTime: order?.expectedTime ? `${order.expectedTime} min` : 'N/A'
    };
    const formattedItemRows =
      order?.items?.map((item, index) => ({
        id: index + 1,
        serial: index + 1,
        items: item?.name || 'N/A',
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
      headerName: 'S.No',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'items',
      headerName: 'Item Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'quantity',
      headerName: 'Quantity ',
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
            <Iconify icon="" /> Orders
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs variant="scrollable" value={tabValue} onChange={handleChange}>
          <Tab value={0} label="Order" />
          <Tab value={1} label="Invoice" />
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
                          <strong>Customer:</strong>
                          {}
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        <strong>Employee:</strong> {}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>totalPrice:</strong> {rowData?.totalPrice}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Discount:</strong> {rowData?.discount}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Tax:</strong> {}
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
                        <strong>Payment Status:</strong> {}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography mt={1} variant="body1">
                          <strong>Status:</strong> {}
                        </Typography>
                      </Box>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Expected Time:</strong>
                      </Typography>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Chef:</strong>
                      </Typography>

                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Table Type:</strong>
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
