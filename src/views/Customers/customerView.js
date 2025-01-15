import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link, CardContent } from '@mui/material';

import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';




const CustomerView = () => {
    const navigate = useNavigate();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/">
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" href="/material-ui/getting-started/installation/">
      Customer Details
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Details
    </Typography>
  ];
  const handleViewClick = (row) => {
    navigate(`/dashboard/order/orderview/${row.id}`, { state: row });
  };
  const columns = [
    {
      field: 'serial',
      headerName: 'S.No',
      width: 20,
      headerAlign: 'center',
      align: 'center'
    },
    
  
    {
      field: 'items',
      headerName: 'Item Details',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
  
    {
      field: 'totalPrice',
      headerName: 'Total ',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
  
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
  
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <VisibilityIcon color="primary" onClick={() => handleViewClick(params.row)} />
    }
  ];
  
  const { id} = useParams();
   const [rows, setRows] = useState([]);
  
    const fetchData = async () => {
      const response = await getApi(urls?.customer?.getbyid.replace(':id',id));
      
      
      
      setRows(response.data);
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    const [order, setOrders] = useState([]);
  
    const fetchOrderData = async () => {
      const response = await getApi(urls?.order?.getorderbycustomerid.replace(':id',id));
      
      
      const formattedData = response.data.map((item, index) => ({
        id: item?._id,
        serial: index + 1,
        phone: item?.phone || 'N/A',
  
        items: item?.items?.map((i) => `${i?.name} (x${i?.quantity})`).join(', ') || 'N/A',
  
        totalPrice: item?.totalPrice?.toFixed(2) || '0.00',
  
        paymentStatus: 'Paid',
        chef: item?.chef || 'N/A',
        type: item?.type || 'N/A'
      }));
      
      
      setOrders(formattedData);
    };
    
    useEffect(() => {
      fetchOrderData();
    }, []);
  
    
  return (
    <>
    

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Customer Details
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>
      <Card sx={{m:1, height:"100px", p:3}} >
      <Stack direction="row" spacing={50} sx={{}}>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5"  color="" sx={{m:3}}>
              Name :{}
            </Typography>
            <Typography variant="h5" textAlign="" color="">
              Email :{}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1} sx={{}}>
            <Typography variant="h5" textAlign="left" color="">
              Address :{}
            </Typography>
            <Typography variant="h5" textAlign="left" color="">
              Phone :{rows.phone}
            </Typography>
          </Stack>
        </Stack>
        </Card>
      <Card>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={order}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Card>
    </>
  );
};
export default CustomerView;
