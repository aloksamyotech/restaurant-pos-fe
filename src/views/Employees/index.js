import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, IconButton, Breadcrumbs, Link, Snackbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Iconify from '../../ui-component/iconify';
import AddUser from './Employees';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SearchBar from 'common/searchBar';
import { t } from 'i18next';

const Categories = () => {
  const navigate = useNavigate();

  const handleView = (row) => {
    navigate(`/dashboard/employees/employeeview/${row.id}`);
  };
  const columns = [
    { field: 'serial', headerName: t('S.No'), flex: 1, headerAlign: 'center', align: 'center' },

    {
      field: 'firstName',
      headerName: t('Name'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },

    {
      field: 'email',
      headerName: t('Email'),
      type: 'string',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'role',
      headerName: t('Role'),
      type: 'string',
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
        <VisibilityIcon
          onClick={() => handleView(params.row)}
          color="primary"
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const response = await getApi(urls?.employee?.get);

    const formattedData = response.data.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      firstName: item?.firstName,
      email: item?.email,
      role: item?.role,
      permissions: item?.permissions
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = rows?.filter((row) => row?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()));

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      {t('Employees')}
    </Link>
  ];

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
            <Iconify icon="" /> {t('Users')}
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
            {t('Add Employee')}
          </Button>
          <AddUser
            open={dialogOpen}
            onClose={handleDialogClose}
            fetchData={fetchData}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{t('Sort by')}:</Typography>
            <TextField select size="small" defaultValue="Created" SelectProps={{ native: true }} sx={{ width: '120px' }}>
              <option value="Created">{t('Created')}</option>
              <option value="Name">{t('Name')}</option>
            </TextField>
            <IconButton>
              <SortIcon />
            </IconButton>
          </Stack>
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
