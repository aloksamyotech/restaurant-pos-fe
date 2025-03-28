import React, { useState, useEffect } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import {Typography,Card,} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { Stack } from '@mui/system';
import { enums } from 'core/constant/constant';
import { t } from 'i18next';

const OverallReport = () => {
  const columns = [
    {
      field: 'serial',
      headerName: t('S.No'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phone',
      headerName: t('Phone No.'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'cost',
      headerName: t('Cost'),
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
      field: 'discount',
      headerName: t('Discount'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'profit',
      headerName: t('Profit'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'payable',
      headerName: t('Payable'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'createdAt',
      headerName: t('Created At'),
      width: 200,
      headerAlign: 'center',
      align: 'center'
    }
  ];

  const [rows, setRows] = useState([]);
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const currency = localStorage.getItem("$2b$10$ehdPSDmr6P1");
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    const now = new Date();

    if (event.target.value === enums.Daily) {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();
      setStartDate(startOfDay);
      setEndDate(endOfDay);
      fetchData(startOfDay, endOfDay);
    } else if (event.target.value === enums.Weekly) {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 6);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date();
      endOfWeek.setHours(23, 59, 59, 999);
      setStartDate(startOfWeek.toISOString());
      setEndDate(endOfWeek.toISOString());
      fetchData(startOfWeek.toISOString(), endOfWeek.toISOString());
    } else if (event.target.value === enums.Monthly) {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999);
      setStartDate(firstDayOfMonth.toISOString());
      setEndDate(lastDayOfMonth.toISOString());
      fetchData(firstDayOfMonth.toISOString(), lastDayOfMonth.toISOString());
    }
  };
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    fetchData(newStartDate, endDate); 
  };
  
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
   setEndDate(newEndDate);
    fetchData(startDate, newEndDate); 
  };
  

  const fetchData = async (startDate, endDate) => {
    const response = await getApi(urls?.order?.get);

    const filteredData = response?.data?.filter((item) => {
      const itemDate = new Date(item?.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
    });

    const formattedData = filteredData.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      phone: item?.phone || t('N/A'),
      price: item?.totalPrice || t('N/A'),
      discount: item?.discount,
      cost: item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0),
      profit: item?.totalPrice - (item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0) + item?.discount),
      payable: item?.totalPrice - item?.discount,
      createdAt: item?.createdAt
        ? new Date(item?.createdAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        : t('N/A')
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const summaryData = [
    { label: t('Total sale amount'), value: `${currency} ${rows.reduce((acc, row) => acc + row.price, 0)}`},
    { label: t('Total cost amount'), value: `${currency} ${rows.reduce((acc, row) => acc + row.cost, 0) }`},
    { label: t('Total discount amount'), value: `${currency} ${rows.reduce((acc, row) => acc + row.discount, 0) }`},
    { label: t('Total profit amount'), value: `${currency} ${rows.reduce((acc, row) => acc + row.profit, 0) }`},
    { label: t('Total payable amount'), value: `${currency} ${ rows.reduce((acc, row) => acc + row.payable, 0) }`},
    { label: t('Tax'), value: `${currency} ${ + 0 }`}
  ];

  return (
    <>
      <Stack
        direction="row"
        spacing={50}
        sx={{
          justifyContent: 'center'
        }}
      >
        <Typography variant="h1" color="Highlight">
          {t('Overall Report')}
        </Typography>
      </Stack>

      <Card sx={{ p: 2, m: 2 }}>
        <Box>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{t('By Duration')}</InputLabel>
                <Select label={t('By Duration')} value={duration} onChange={handleDurationChange}>
                  <MenuItem value="Daily">{t('Daily')}</MenuItem>
                  <MenuItem value="Weekly">{t('Weekly')}</MenuItem>
                  <MenuItem value="Monthly">{t('Monthly')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={t('Starting date')}
                type="date"
                value={startDate.split('T')[0]}
                InputLabelProps={{ shrink: true }}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={t('Ending date')} 
              type="date" value={endDate.split('T')[0]} 
              InputLabelProps={{ shrink: true }}
              onChange={handleEndDateChange} />
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {summaryData.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {t(item.label)}
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
