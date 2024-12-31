import React, { useState, useEffect } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import AddItemDialog from "./AddItems";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from "core/constant/urls";
import { deleteApi } from 'core/apis/apiClient.js';
import DeleteConfirmationDialog from "./Delete.js";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from "./action";
import { Snackbar } from '@mui/material';
import { getAllCategories, getAllItems } from "core/apis/allapis";


const Categories = () => {


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
  function handleClick(event) {
    event?.preventDefault();

  }
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);


  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedTag, setSelectedTag] = useState(null);
  const handleEditDialogOpen = (tag) => {
    setSelectedTag(tag);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);

  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const columns = [
    {
      field: 'serial', headerName: 'S.No', width: 20, headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Item Name',
      width: 100,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 150,

      headerAlign: 'center',
      align: 'center',
      editable: true,
    },

    {
      field: 'image',
      headerName: 'Dish Image',
      width: 100,
      editable: true,
      renderCell: (params) => (
        <img
          src={params?.row?.image}
          alt={params?.row?.image}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },



    {
      field: 'cost',
      headerName: 'Cost',
      type: 'number',
      width: 100,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      sortable: false,
      width: 100,
      headerAlign: 'center',
      align: 'center',

    },
    {
      field: 'categoryId',
      headerName: 'Category',
      type: 'string',
      width: 110,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'ingredient',
      headerName: 'Ingredients',
      type: [],
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

        <Stack direction="row" spacing={4}>

          <EditIcon color="primary" onClick={() => handleEditDialogOpen(params?.row)} />
          <EditDialog open={editDialogOpen} onClose={handleEditDialogClose} fetchData={fetchData}
            tag={selectedTag} setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen} />

          <DeleteIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => setDeleteDialogOpen(params?.row?.id)}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen === params?.row?.id}
            onClose={() => setDeleteDialogOpen(null)}
            onConfirm={async () => {
              await deleteApi(urls?.item?.delete?.replace(':id', params?.row?.id));
              setRows((prevRows) => prevRows.filter((row) => row?.id !== params?.row?.id));
              await fetchData();
              setSnackbarMessage('Item deleted successfully!');
              setSnackbarOpen(true);
              setDeleteDialogOpen(null);

            }}
          />
        </Stack>



      ),
    }
  ];

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    
    const response = await getApi(urls?.item.get);
       
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      name: item?.name,
      desc: item?.desc,
      image: item?.image,
      cost: item?.cost,
      price: item?.price,
      categoryId: item?.categoryId?.categoryName,
      ingredient: item?.ingredientId?.map((ingredient) => ingredient?.name).join(', ') || 'N/A',
  

      
    }));
   


    setRows(formattedData);


  };

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <Container sx={{}}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
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
          <AddItemDialog open={dialogOpen} onClose={handleDialogClose} fetchData={fetchData}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen} />

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
            rowHeight={75}
            columns={columns}


          />
        </Box>
      </Card >
    </Container>
  );
};

export default Categories;
