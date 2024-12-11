import React, { useState } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import sandwich from "assets/images/sandwich.jpg"
import AddItemDialog from "./AddItems";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
  { field: 'id', headerName: 'S.No', width: 90 },
  {
    field: 'dishImage',
    headerName: 'Dish Image',
    width: 150,
    editable: true,
    renderCell: (params) => (
      <img
        src={params?.row?.dishImage}
        alt={params?.row?.dishName}
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    ),
  },
  {
    field: 'dishName',
    headerName: 'Dish Name',
    width: 150,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'cost',
    headerName: 'Cost',
    type: 'number',
    width: 110,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    headerAlign: 'center',
    align: 'center',

  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'number',
    width: 110,
    editable: true,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    align: 'center',

    width: 110,
    renderCell: (params) => (

      <VisibilityIcon color="primary" />


    ),
  }
];

const rows = [
  { id: 1, dishImage: sandwich, dishName: 'Sandwich', cost: 35, price: 50, category: 'Fast Food', action: '' },
  { id: 2, dishImage: sandwich, dishName: 'Sandwich', cost: 35, price: 50, category: 'Fast Food', action: '' },
  { id: 3, dishImage: sandwich, dishName: 'Sandwich', cost: 35, price: 50, category: 'Fast Food', action: '' },
  { id: 4, dishImage: sandwich, dishName: 'Sandwich', cost: 35, price: 50, category: 'Fast Food', action: '' },
  { id: 5, dishImage: sandwich, dishName: 'Sandwich', cost: 35, price: 50, category: 'Fast Food', action: '' },

];

const Categories = () => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  function handleClick(event) {
    event?.preventDefault();
    console.info('You clicked a breadcrumb.');
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
      Food Items
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Items
    </Typography>,
  ];

  return (
    <Container sx={{  }}>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Food Items
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
          <AddItemDialog open={dialogOpen} onClose={handleDialogClose} />

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

            disableRowSelectionOnClick
          />
        </Box>
        </Card >
    </Container>
  );
};

export default Categories;
