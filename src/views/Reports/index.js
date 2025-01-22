import React, { useState, useEffect } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';

import { Stack } from '@mui/system';
const OverallReport = () => {
  const columns = [
    {
      field: 'serial',
      headerName: 'S.No',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phone',
      headerName: 'Phone No.',
      flex: 1,

      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'price',
      headerName: 'Price ',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'profit',
      headerName: 'Profit',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'payable',
      headerName: 'Payable',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      headerAlign: 'center',
      align: 'center'
    }
  ];

  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await getApi(urls?.order?.get);
    

    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      phone: item?.phone || 'N/A',
      price: item?.totalPrice || 'N/A',
      discount: item?.discount,

      cost: item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0),
      profit: item?.totalPrice - (item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0) + item?.discount),
      payable: item?.totalPrice - item?.discount,
      createdAt: item?.createdAt
        ? new Date(item.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        : 'N/A'
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotalCost = () => {
    const totalCostSum = rows.reduce((acc, row) => {
      return acc + row.cost;
    }, 0);

    return totalCostSum;
  };

  const calculateTotalPrice = () => {
    const totalPriceSum = rows.reduce((acc, row) => {
      return acc + row.price;
    }, 0);

    return totalPriceSum;
  };

  const calculateTotalPayable = () => {
    const totalPayableSum = rows.reduce((acc, row) => {
      return acc + row.payable;
    }, 0);

    return totalPayableSum;
  };

  const calculateTotalDiscount = () => {
    const totalDiscountSum = rows.reduce((acc, row) => {
      return acc + row.discount;
    }, 0);

    return totalDiscountSum;
  };

  const calculateTotalProfit = () => {
    const totalProfitSum = rows.reduce((acc, row) => {
      return acc + row.profit;
    }, 0);

    return totalProfitSum;
  };

  const totalCost = calculateTotalCost();
  const totalPrice = calculateTotalPrice();
  const totalPayable = calculateTotalPayable();
  const totalDiscount = calculateTotalDiscount();
  const totalProfit = calculateTotalProfit();

  const summaryData = [
    { label: 'Total sale amount', value: 'Rs.' + totalPrice },
    { label: 'Total cost amount', value: 'Rs.' + totalCost },
    { label: 'Total discount amount', value: 'Rs.' + totalDiscount },
    { label: 'Total profit amount', value: 'Rs.' + totalProfit },
    { label: 'Total tax amount', value: '0' },
    { label: 'Total payable amount', value: 'Rs.' + totalPayable }
  ];

  return (
    <>
      <Stack direction="row" spacing={50}>
        <Typography variant="h1" color="Highlight" sx={{}}>
          Overall Report
        </Typography>
        <Typography variant="h4">Report created at:</Typography>
      </Stack>

      <Card sx={{ p: 2, m: 2 }}>
        <Box>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>By Duration</InputLabel>
                <Select label="By Duration">
                  <MenuItem value={10}>Daily</MenuItem>
                  <MenuItem value={20}>Monthly</MenuItem>
                  <MenuItem value={30}>Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField fullWidth label="Starting date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Ending date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>

          <Grid container spacing={2}></Grid>
        </Box>
      </Card>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {summaryData.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mt: 4 }}>
          <Box>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default OverallReport;
