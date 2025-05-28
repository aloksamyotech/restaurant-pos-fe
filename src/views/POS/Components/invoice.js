import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  Card,
  Grid,
  Select,
  MenuItem,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table
} from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import css from 'assets/printInvoice.css';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import moment from 'moment';

const Invoice = (props) => {
  const params = useParams();
  const invoiceId = params?.invoiceId || props?.invoiceId;
  const [rowData, setrowdata] = useState({});
  const [itemRow, setitemRow] = useState([]);
  const [grandTotal, setGrandTotal] = useState({});
  const [printSize, setPrintSize] = useState('A4');
  const currency = localStorage.getItem('$2b$10$ehdPSDmr6P1');

  const fetchData = async () => {
    const response = await getApi(urls?.invoice?.getbyid?.replace(':id', invoiceId));

    const invoice = response?.data;

    const formattedData = {
      id: invoice?._id.substring(18,24),
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
      email: invoice?.customerId?.email || 'N/A',
      orderId: invoice?.orderId || 'N/A',
      date: invoice?.createdAt
    };
    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, [invoiceId]);

  const fetchItems = async () => {
    if (rowData?.orderId) {
      const OrderId = rowData?.orderId;
      const orderResponse = await getApi(urls?.order?.getbyid?.replace(':id', OrderId));
      const items = orderResponse?.data?.items || [];
      const totalPrice = orderResponse?.data?.totalPrice || '0.00';
      const discount = orderResponse?.data?.discount || '0.00';
      setGrandTotal({ totalPrice, discount });
      const formattedItemRows = items.map((item, index) => ({
        id: index + 1,
        serial: index + 1,
        items: item?.name || t('N/A'),
        price: item?.price?.toFixed(2) || '0.00',
        quantity: item?.quantity || '0'
      }));
      setitemRow(formattedItemRows);
    }
  };
  useEffect(() => {
    if (rowData?.orderId !== 'N/A') {
      fetchItems();
    }
  }, [rowData?.orderId]);
  const totalAmount = grandTotal?.totalPrice;
  const discountPercentage = grandTotal?.discount;
  const discountAmount = (discountPercentage * totalAmount) / 100;
  const finalPrice = totalAmount - discountAmount;
  const invoiceOrderId =rowData?.orderId?.substring(18,24);
  const invoiceDate =moment.utc(rowData.date).local().format('DD-MM-YY');
 
  
  

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
  const handlePrint = (size) => {
    let printStyle = document.createElement('style');

    if (size === 'small') {
      printStyle.innerHTML = `
        @media print {
            @page { size: 80mm auto; margin: 5mm; }
            #invoice-print { width: 80mm; font-size: 12px; padding: 5px; }
            .MuiTable-root, .MuiTableCell-root {
                font-size: 10px !important;
                padding: 2px !important;
            }
            .MuiTableHead-root {
                display: none;
            }
        }
      `;
    } else {
      printStyle.innerHTML = `
        @media print {
            @page { size: A4; margin: 20mm; }
            #invoice-print { width: 100%; font-size: 14px; padding: 20px; }
        }
      `;
    }

    document.head.appendChild(printStyle);
    window.print();
    document.head.removeChild(printStyle);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '100%', margin: '0 auto' }} id="invoice-print">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" textAlign="center" color="primary" gutterBottom sx={{ mb: 2 }}>
          {t('Invoice')}
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} sx={{maxWidth: 130, marginBottom: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography  variant="h5" color="">{t('Invoice ID')}:</Typography>
            <Typography>{rowData?.id}</Typography>


          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography  variant="h5" color="">{t('Order ID')}:</Typography>
            <Typography>{invoiceOrderId}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography  variant="h5" color="">{t('Date')}:</Typography>
            <Typography>{invoiceDate}</Typography>
          </Box>
        </Box>
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
            <Typography variant="h4" textAlign="left" color="primary" gutterBottom>
              {t('Customer Details')}
            </Typography>

            <Stack direction="column" spacing={1} sx={{}}>
              <Typography variant="h5" textAlign="left" color="">
                {t('Name')} :{rowData?.customer}
              </Typography>

              <Typography variant="h5" textAlign="left" color="">
                {t('Phone')} :{rowData?.phone}
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{t('S.No')}</TableCell>
                    <TableCell align="center">{t('Item Name')}</TableCell>
                    <TableCell align="center">{t('Price')}</TableCell>
                    <TableCell align="center">{t('Quantity')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemRow.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.serial}</TableCell>
                      <TableCell align="center">{row.items}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
        <br />

       

        <Box display="flex" flexDirection="column" justifyContent="start" sx={{ width: 180, ml: 'auto' }}>
          {[
            { label: t('Total'), value: totalAmount },
            { label: t('Discount'), value: discountAmount, extra: `(${discountPercentage}%)` },
            { label: t('Grand Total'), value: finalPrice, highlight: true }
          ].map(({ label, value, extra, highlight }, i) => (
            <Box key={i} display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant={highlight ? 'h4' : 'h5'} color={highlight ? 'primary' : 'grey'}>
                {label} {extra && extra}
              </Typography>
              <Typography variant={highlight ? 'h4' : 'h5'} color={highlight ? 'primary' : 'grey'}>
                {currency}
                {parseFloat(value).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box textAlign="center" mt={4} className="no-print">
          <Select value={printSize} onChange={(e) => setPrintSize(e.target.value)} sx={{ marginRight: 2 }}>
            <MenuItem value="A4">A4 (Full Page)</MenuItem>
            <MenuItem value="small">80mm Receipt</MenuItem>
          </Select>

          <Button variant="contained" color="primary" onClick={() => handlePrint(printSize)}>
            {t('Print Invoice')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Invoice;
