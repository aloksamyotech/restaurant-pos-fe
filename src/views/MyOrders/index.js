import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link } from '@mui/material';
import SearchBar from 'common/searchBar';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { getUserInfoFromToken } from 'core/apis/common';
import LinearWithValueLabel from 'views/Kitchen/progressBar';


const Kitchen = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      {t('My Orders')}
    </Link>
  ];
  const handleViewClick = (row) => {
    navigate(`/dashboard/kitchen/singleKitchenOrder/${row.id}`, { state: row });
  };
  const statusColors = { "In Progress": "orange", Pending: "red", Completed: "green"}
  
  const columns = [
    { field: 'serial', headerName: t('S.No'), flex: 1, headerAlign: 'center', align: 'center' },

    {
      field: 'orderId',
      headerName: t('Order ID'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'orderType',
      headerName: t('Order Type'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true
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
  const UserInfo = getUserInfoFromToken();
 const fetchData = async () => {
    const response = await getApi(urls?.kitchen?.get);
    const ChefId = UserInfo?.id;
   
    const filteredData = response?.data?.filter((item) => item?.chef === ChefId);

    const formattedData = filteredData?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      orderId: item?.order?._id?.substring(18, 24),
      table: item?.table || '--',
      status: item?.completedPercentage || '0',
      orderType: item?.order?.type || '--'
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredRows = rows?.filter((row) => row?.table?.toString().toLowerCase().includes(searchTerm?.toLowerCase()));
  return (
    <Container>
    

      <Card>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={filteredRows} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Card>
    </Container>
  );
};
export default Kitchen;
