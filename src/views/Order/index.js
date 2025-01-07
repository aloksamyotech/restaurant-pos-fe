import React, { useState, useEffect } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import { getApi } from 'core/apis/apiClient.js';
import { urls } from "core/constant/urls";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router";





const Categories = () => {
const navigate=useNavigate();


  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/" onClick={handleClick}>
      <HomeIcon />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="primary"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Orders
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Orders
    </Typography>,
  ];
  function handleClick(event) {
    event?.preventDefault();

  }
  const handleViewClick = (row) => {
    navigate(`/dashboard/order/orderview/${row.id}`, { state: row });
  };
  const columns = [
    {
      field: 'serial', headerName: 'S.No', width: 20, headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'customer',
      headerName: 'Customer Name',
      width: 150,
      
      headerAlign: 'center',
      align: 'center',
    },
    
    {
        field: 'items',
        headerName: 'Item Details',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        
      },
     
     
      {
        field: 'totalPrice',
        headerName: 'Total ',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        
      },
   
    
      {
        field: 'paymentStatus',
        headerName: 'Payment Status',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        
      },
    
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            
                <VisibilityIcon color="primary" onClick={()=>handleViewClick(params.row)}/>
               
            
        ),
        
      },

];
const [rows, setRows] = useState([]);
const fetchData = async () => {
    const response = await getApi(urls?.order.get);
   
  
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      customer: item?.customer || "N/A",
     
      items: item?.items?.map(
        (i) => `${i?.name} (x${i?.quantity})`
      ).join(", ") || "N/A",
    
      totalPrice: item?.totalPrice?.toFixed(2) || "0.00",
      
      paymentStatus: item?.paymentStatus === 1 ? "Paid" : "Unpaid",
      chef: item?.chef || "N/A",
      type: item?.type || "N/A",
    }));
  
    setRows(formattedData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  



 
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

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="Search" variant="outlined" size="small" sx={{ flex: 1 }} />
         
          

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Sort by:</Typography>
            <TextField
              select
              size="small"
              defaultValue="Created"
              SelectProps={{ native: true }}
              sx={{ width: "120px" }}
            >
              <option value="Created">Created</option>
              <option value="Name">Name</option>
            </TextField>
            <IconButton>
              <SortIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      <Card>
        <Box sx={{ height: 400,  }}>
          <DataGrid
            rows={rows}
            
            columns={columns} 
            getRowId={(row) => row.id}  


          />
        </Box>
      </Card >
    </Container>
  );
};

export default Categories;
