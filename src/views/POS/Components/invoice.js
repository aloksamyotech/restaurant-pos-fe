import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Paper, Button, Card, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import css from 'assets/printInvoice.css';

import { useNavigate } from 'react-router';
import { t } from 'i18next';

const Invoice = (props) => {
  const params = useParams();

  const invoiceId = params?.invoiceId || props?.invoiceId;

  const [rowData, setrowdata] = useState({});

  const fetchData = async () => {
    const response = await getApi(urls?.invoice?.getbyid?.replace(':id', invoiceId));

    const invoice = response?.data;

    const formattedData = {
      id: invoice?._id,
      customer: invoice?.customer || 'N/A',
      employee: invoice?.employee || 'N/A',
      totalPrice: invoice?.amount?.toFixed(2) || '0.00',
      discount: invoice?.discount?.toFixed(2) || '0.00',
      tax: invoice?.tax?.toFixed(2) || '0.00',
      paymentStatus: 'Paid',
      chef: invoice?.chef || 'N/A',
      paymentMode: invoice?.paymentMode || 'N/A',
      type: invoice?.type || 'N/A',
      status: invoice?.status || 'Pending',
      expectedTime: invoice?.expectedTime ? `${invoice.expectedTime} min` : 'N/A',
      phone: invoice?.customerId?.phone || 'N/A',
      address: invoice?.customerId?.address || 'N/A',
      email: invoice?.customerId?.email || 'N/A'
    };

    const formattedItemRows =
      invoice?.items?.map((item, index) => ({
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
  }, [invoiceId]);

  const finalPrice = rowData.totalPrice - rowData.discount;

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '100%', margin: '0 auto' }} id="invoice-print">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" textAlign="center" color="primary" gutterBottom>
          {t('Invoice')}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" textAlign="left" color="primary" gutterBottom>
              {t('Apna Restaurant')}
            </Typography>
            <Typography variant="h6" textAlign="left" gutterBottom>
              {t('71 Gama Street, California ')}
            </Typography>
            <Typography variant="h6" textAlign="left" gutterBottom>
              {t('CA 90001, USA ')}
            </Typography>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'right' }}></Box>
          <Grid item>
            <Typography variant="h4" textAlign="left" color="primary" gutterBottom sx={{ mt: 3 }}>
              {t('Customer Details')}
            </Typography>

            <Stack direction="column" spacing={1} sx={{}}>
              <Typography variant="h5" textAlign="left" color="">
                {t('Name')} :{rowData?.customer}
              </Typography>

              <Typography variant="h5" textAlign="left" color="">
                {t('Phone')} :{rowData?.phone}
              </Typography>
              <Typography variant="h5" textAlign="left" color="">
                {t('Address')} :{rowData?.address}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="h4" textAlign="left" color="" sx={{ mt: 3 }}>
          {t('Item Details')}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Card>
          <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
              rows={itemRow}
              columns={columns}
              pagination
              components={{
                Pagination: () => null
              }}
            />
          </Box>
        </Card>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="right">
          <Typography variant="h4" color="primary">
            {t('Total')}: {t('Rs.')}. {finalPrice}
          </Typography>
        </Box>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            {t('Print Invoice')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Invoice;
