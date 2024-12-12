import React, { useState } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import AddExpensesDialog  from "./AddExpenses";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';


const columns = [
  { field: 'id', headerName: 'ID', flex:1,headerAlign: 'center',align: 'center',},
  
  {
    field: 'expenses',
    headerName: 'Expenses ',
    flex:1,
    headerAlign: 'center',
    align: 'center',
    editable: true,
  },
  
  {
    field: 'amount',
    headerName: 'Amount',
    type:'string',
    sortable: false,
    flex:1,
    headerAlign: 'center',
    align: 'center',

  },
  {
    field: 'category',
    headerName: 'Category',
    type:'string',
    sortable: false,
    flex:1,
    headerAlign: 'center',
    align: 'center',

  },
  
  
  
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    align: 'center',

    flex:1,
    renderCell: (params) => (

      <VisibilityIcon color="primary" />


    ),
  }
];

const rows = [
  { id: 1,  expenses: 'Vegetable', amount:1000,category:'Kitchen Expense',  action: '' },
  { id: 2,  expenses: 'Fish', amount:5000,category:'Kitchen Expense',   action: '' },
  { id: 3,  expenses: 'Pepsi', amount:1000,category:'Drinks',    action: '' },
  { id: 4,  expenses: 'Veg', amount:2000,category:'Kitchen Expense',    action: '' },
  { id: 5,  expenses: 'Test', amount:3000,  category:'Human Resource', action: '' },

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
    <Link
      underline="hover"
      key="2"
      color="primary"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Expenses
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Expenses
    </Typography>,
  ];

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Expenses 
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
            Add Expense
          </Button>
          <AddExpensesDialog  open={dialogOpen} onClose={handleDialogClose} />

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
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
           
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}

            
          />
        </Box>
        </Card >
    </Container>
  );
};

export default Categories;
