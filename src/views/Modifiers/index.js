import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link, Popover } from '@mui/material';
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
import DeleteConfirmationDialog from '../../common/commonDelete';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import SearchBar from 'common/searchBar';
import { useTranslation } from 'react-i18next';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Categories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const columns = [
    { field: 'serial', headerName: t('S.No'), flex: 1, headerAlign: 'center', align: 'center' },

    {
      field: 'name',
      headerName: t('Modifier'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
    },
    {
      field: 'desc',
      headerName: t('Description'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
    },
    {
      field: 'cost',
      headerName: t('Buying Price'),
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'price',
      headerName: t('Selling Price'),
      description: t('This column has a value getter and is not sortable.'),
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'action',
      headerName: t('Action'),
      headerAlign: 'center',
      align: 'center',

      flex: 1,
      renderCell: (params) => (
        <>

        <MoreHorizIcon onClick={handleClick} />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{
            '& .MuiPopover-paper': {
              boxShadow: 'none'
            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
        <Stack direction="row" spacing={1}>
          <EditIcon
            color="primary"
            onClick={() => handleEditDialogOpen(params?.row)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 3
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
                boxShadow: 3
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
              setSnackbarMessage(t('Modifier deleted successfully!'));
              setSnackbarOpen(true);
              setDeleteDialogOpen(null);
            }}
          />
        </Stack>
        </Popover>
        </>
      )
    }
  ];

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      {t('Food Modifiers')}
    </Link>
  ];

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const response = await getApi(urls?.modifier?.get);
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      name: item?.name,
      desc: item?.desc || '--',
      cost: item?.cost,
      price: item?.price,
      isAvailable: item?.true
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredRows = rows?.filter((row) => row?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));

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
            <Iconify icon="" /> {t('Food Modifiers')}
          </Typography>

          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            {t('Add Modifier')}
          </Button>
          <AddModifierDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            fetchData={fetchData}
            setRows={setRows}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />
        </Stack>
      </Card>

      <Card>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={filteredRows} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Card>
    </Container>
  );
};

export default Categories;
