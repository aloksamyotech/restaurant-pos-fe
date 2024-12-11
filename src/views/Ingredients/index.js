import React, { useState } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import AddIngredientDialog from "./Addingredients";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';




const columns = [
  { field: 'id', headerName: 'S.No', flex:1,headerAlign: 'center',align: 'center',},
  
  {
    field: 'dishName',
    headerName: 'Dish Name',
    flex:1,
    headerAlign: 'center',
    align: 'center',
    editable: true,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    type: 'number',
    flex:1,
    headerAlign: 'center',
    editable: true,
    align: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex:1,
    headerAlign: 'center',
    align: 'center',

  },
  {
    field: 'availableQty',
    headerName: 'Available Quantity',
    type:'string',
    sortable: false,
    flex:1,
    headerAlign: 'center',
    align: 'center',

  },
  {
    field: 'unit',
    headerName: 'Unit',
    description: 'This column has a value getter and is not sortable.',
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
  { id: 1,  dishName: 'Milk ', cost: 35, price: 50, availableQty:50,unit:'ltr',  action: '' },
  { id: 2,  dishName: 'Potato', cost: 35, price: 50,availableQty:10,unit:'kg',   action: '' },
  { id: 3,  dishName: 'Bread', cost: 35, price: 50,availableQty:45,unit:'piece',    action: '' },
  { id: 4,  dishName: 'Katchup', cost: 35, price: 50,availableQty:100,unit:'piece',    action: '' },
  { id: 5,  dishName: 'Onion', cost: 35, price: 50,availableQty:13,  unit:'kg', action: '' },

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
      Food Ingredients
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Ingredients
    </Typography>,
  ];

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Food Ingredients
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
            Add Item
          </Button>
          <AddIngredientDialog open={dialogOpen} onClose={handleDialogClose} />

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
