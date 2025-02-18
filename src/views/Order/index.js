import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Iconify from '../../ui-component/iconify';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import SearchBar from 'common/searchBar';
import { t } from 'i18next';

const Categories = () => {
  const navigate = useNavigate();

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

  const handleViewClick = (row) => {
    navigate(`/dashboard/order/orderview/${row.id}`, { state: row });
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
      field: 'phone',
      headerName: t('Phone No.'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'items',
      headerName: t('Item Details'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'totalPrice',
      headerName: t('Total'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'paymentStatus',
      headerName: t('Payment Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" size="small" color="success" sx={{ textTransform: 'none' }}>
          {t(params?.row?.paymentStatus)}
        </Button>
      )
    },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <VisibilityIcon
          color="primary"
          onClick={() => handleViewClick(params.row)}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 3
            }
          }}
        />
      )
    }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await getApi(urls?.order?.get);

    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      phone: item?.phone || t('N/A'),
      items: item?.items?.map((i) => `${i?.name} (${t('x')}${i?.quantity})`).join(', ') || t('N/A'),
      totalPrice: item?.totalPrice?.toFixed(2) || '0.00',
      paymentStatus: t('Paid')
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = rows?.filter((row) => row?.phone?.toString().toLowerCase().includes(searchTerm?.toLowerCase()));

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

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

         
        </Stack>
      </Card>

      <Card>
        <Box sx={{ height: 400 }}>
          <DataGrid rows={filteredRows} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Card>
    </Container>
  );
};

export default Categories;
