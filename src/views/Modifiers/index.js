import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Iconify from '../../ui-component/iconify';
import AddModifierDialog from './Addmodifiers';
import EditModifierDialog from './action';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { deleteApi } from 'core/apis/apiClient.js';
import DeleteConfirmationDialog from './Delete.js';
import { Snackbar } from '@mui/material';

const Categories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedModifier, setSelectedModifier] = useState(null);

  const handleEditDialogOpen = (modifier) => {
    setSelectedModifier(modifier);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const columns = [
    { field: 'serial', headerName: 'S.No', flex: 1, headerAlign: 'center', align: 'center' },

    {
      field: 'name',
      headerName: 'Modifier',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'cost',
      headerName: 'Cost',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      editable: true,
      align: 'center'
    },
    {
      field: 'price',
      headerName: 'Price',
      description: 'This column has a value getter and is not sortable.',
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
        <Stack direction="row" spacing={4}>
          <EditIcon
            color="primary"
            onClick={() => handleEditDialogOpen(params?.row)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'blue'
              }
            }}
          />
          <EditModifierDialog
            open={editDialogOpen}
            onClose={handleEditDialogClose}
            fetchData={fetchData}
            modifier={selectedModifier}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />

          <DeleteIcon
            sx={{
              color: 'red',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'blue'
              }
            }}
            onClick={() => setDeleteDialogOpen(params?.row?.id)}
          />
          <DeleteConfirmationDialog
            open={deleteDialogOpen === params.row.id}
            onClose={() => setDeleteDialogOpen(null)}
            onConfirm={async () => {
              await deleteApi(urls?.modifier?.delete?.replace(':id', params?.row?.id));
              setRows((prevRows) => prevRows.filter((row) => row.id !== params?.row?.id));
              await fetchData();
              setSnackbarMessage('Modifier deleted successfully!');
              setSnackbarOpen(true);
              setDeleteDialogOpen(null);
            }}
          />
        </Stack>
      )
    }
  ];
  function handleClick(event) {
    event?.preventDefault();
  }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={handleClick}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" onClick={handleClick}>
      Food Modifiers
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Modifiers
    </Typography>
  ];

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const response = await getApi(urls?.modifier?.get);
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      name: item?.name,
      desc: item?.desc,
      cost: item?.cost,
      price: item?.price,
      isAvailable: item?.true
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
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
            <Iconify icon="" /> Food Modifiers
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
            Add Modifier
          </Button>
          <AddModifierDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            fetchData={fetchData}
            setRows={setRows}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />

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
          <DataGrid columns={columns} rows={rows} />
        </Box>
      </Card>
    </Container>
  );
};

export default Categories;
