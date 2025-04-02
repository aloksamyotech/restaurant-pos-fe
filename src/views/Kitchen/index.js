import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link, Tabs, Tab, Divider } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import SearchBar from 'common/searchBar';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import MyOrder from 'views/MyOrders';
import LinearWithValueLabel from './progressBar';


const Kitchen = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      {t('Kitchen')}
    </Link>
  ];
  const handleViewClick = (row) => {
    navigate(`/dashboard/kitchen/singleKitchenOrder/${row.id}`, { state: row });
  };
  const statusColors = { "In Progress": "orange", Pending: "red", Completed: "green" }
  const columns = [
    { field: 'serial', headerName: t('S.No'), flex: 1, headerAlign: 'center', align: 'center' },

    {
      field: 'orderId',
      headerName: t('Order Id'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
    },
    {
      field: 'orderType',
      headerName: t('Order Type'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
    },

    {
      field: 'table',
      headerName: t('Table'),
      type: 'string',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: "status",
      headerName: t("Status"),
      type: "string",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <LinearWithValueLabel completedPercentage={params.value} />;
      },
    },

    {
      field: 'action',
      headerName: t('Action'),
      headerAlign: 'center',
      align: 'center',

      flex: 1,
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

  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const fetchData = async () => {
    const response = await getApi(urls?.kitchen?.get);
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      orderId: item?.order?._id?.substring(19, 24),
      table: item?.table || '--',
      status: item?.completedPercentage || '0',
      orderType: item?.order?.type || '--',
}));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredRows = rows?.filter((row) => row?.orderId?.toString().toLowerCase().includes(searchTerm?.toLowerCase()));
  return (
    <Container>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> {t('Kitchen')}
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
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs variant="scrollable" value={tabValue} onChange={handleChange}>
          <Tab value={0} label={t('All Order')} />
          <Tab value={1} label={t('My Order')} />
        </Tabs>
        <Divider sx={{ borderColor: 'grey.300' }} />
        {tabValue === 0 && (

          <Card>
            <Box sx={{ height: 400, width: '100%' }}>

              <DataGrid rows={filteredRows} columns={columns} getRowId={(row) => row.id} />
            </Box>
          </Card>
        )}
        {tabValue === 1 && <MyOrder />}
      </Box>


    </Container>
  );
};
export default Kitchen;
