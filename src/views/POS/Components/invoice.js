import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Paper, Button, Card, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import css from 'assets/printInvoice.css';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '100%', margin: '0 auto' }} id="invoice-print">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" textAlign="center" color="primary" gutterBottom>
          Invoice
        </Typography>
        <Typography variant="h3" textAlign="left" color="primary" gutterBottom>
          Apna Restaurant
        </Typography>
        <Typography variant="h4" textAlign="Right" color="primary" gutterBottom>
          Date: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="h4" textAlign="left" color="" gutterBottom>
          Order Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" textAlign="left" color="">
            Order ID: {invoiceId ? `ORD-${invoiceId.slice(-6).toUpperCase()}` : 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}></Box>

        <Typography variant="h4" textAlign="left" color="" gutterBottom sx={{ mt: 3 }}>
          Customer Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={50} sx={{}}>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5" textAlign="left" color="">
              Name :{rowData?.customer}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Email :{rowData?.email}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5" textAlign="left" color="">
              Address :{rowData?.address}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Phone :{rowData?.phone}
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="h4" textAlign="left" color="" sx={{ mt: 3 }}>
          Payment Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={50} sx={{}}>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5" textAlign="left" color="">
              Payment Status :{rowData?.paymentStatus}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Payment Type:{rowData?.paymentMode}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Payment Date:{new Date().toLocaleDateString()}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5" textAlign="left" color="">
              Total Price:{rowData?.totalPrice}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Discount :{rowData?.discount}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Tax:
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h4" textAlign="left" color="" sx={{ mt: 3 }}>
          Item Details
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
            Total: Rs. {finalPrice}
          </Typography>
        </Box>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Print Invoice
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Invoice;
