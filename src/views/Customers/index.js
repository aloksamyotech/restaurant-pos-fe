import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Iconify from '../../ui-component/iconify';
import Customer from './Customers';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
  { field: 'id', headerName: 'S.No', flex: 1, headerAlign: 'center', align: 'center' },

  {
    field: 'customer',
    headerName: 'Customer ',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },

  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    align: 'center',

    flex: 1,
    renderCell: (params) => (
      <Link fontSize={0} color="inherit" href="/dashboard/customer/customerview">
        <VisibilityIcon color="primary" />
      </Link>
    )
  }
];

const rows = [
  { id: 1, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '' },
  { id: 2, customer: 'Rahul', email: 'rahul@gmail.com', phone: 9876543210, address: '' },
  { id: 3, customer: 'Rohit', email: 'rohit@gmail.com', phone: 9876543210, address: '' },
  { id: 4, customer: 'Neeraj', email: 'neeraj@gmail.com', phone: 9876543210, address: '' },
  { id: 5, customer: 'Jairaj', email: 'jairaj@gmail.com', phone: 9876543210, address: '' }
];

const Categories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  function handleClick(event) {
    event?.preventDefault();
    console?.info('You clicked a breadcrumb.');
  }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/" onClick={handleClick}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" href="/material-ui/getting-started/installation/" onClick={handleClick}>
      Customers
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      customer
    </Typography>
  ];

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Customers
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="Search" variant="outlined" size="small" sx={{ flex: 1 }} />
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            Add User
          </Button>
          <Customer open={dialogOpen} onClose={handleDialogClose} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Sort by:</Typography>
            <TextField select size="small" defaultValue="Created" SelectProps={{ native: true }} sx={{ width: '120px' }}>
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
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
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
    </Container>
  );
};

export default Categories;
