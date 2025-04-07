import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link, Popover } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import AddModifierDialog from './AddTable';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { urls } from 'core/constant/urls';
import { getApi,updateApi } from 'core/apis/apiClient.js';
import { deleteApi } from 'core/apis/apiClient.js';
import DeleteConfirmationDialog from '../../common/commonDelete';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import SearchBar from 'common/searchBar';
import { useTranslation } from 'react-i18next';
import UpdateIcon from '@mui/icons-material/Update';
import {enums} from 'core/constant/constant';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Categories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);


  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleEditDialogOpen = (table) => {
    setSelectedTable(table);
    setIsEditMode(true);
    setDialogOpen(true);
    };
    const handleUpdateStatus=async(table)=>{
      const response = await updateApi(urls?.table?.update?.replace(':id', table?.id), 
      { status: table?.status === enums?.Occupied ? enums?.Vacant : enums?.Occupied });
      fetchData();
    }
  

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
      field: 'tableNumber',
      headerName: t('Table No.'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
    },
    {
      field: 'status',
      headerName: t('Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: params.row.status === enums?.Occupied ? "green" : "red",
            fontWeight: "bold"
          }}
        >
          {params.row.status}
        </Typography>
      )
    },
   
    {
      field: 'space',
      headerName: t('Seating Capacity'),
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'update status',
      headerName: t('Change Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
     
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleUpdateStatus(params.row)}
        >
          <UpdateIcon/>
        </Button>
      )
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
                scale: 1.1
              }
            }}
          />

          <DeleteIcon
            sx={{
              color: 'red',
              cursor: 'pointer',
              '&:hover': {
                scale: 1.1
              }
            }}
            onClick={() => setDeleteDialogOpen(params?.row?.id)}
          />
          <DeleteConfirmationDialog
            open={deleteDialogOpen === params.row.id}
            onClose={() => setDeleteDialogOpen(null)}
            onConfirm={async () => {
              await deleteApi(urls?.table?.delete?.replace(':id', params?.row?.id));
              setRows((prevRows) => prevRows.filter((row) => row.id !== params?.row?.id));
              await fetchData();
              setSnackbarMessage(t('Table deleted successfully!'));
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
      {t('Table')}
    </Link>
  ];

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const response = await getApi(urls?.table?.get);

    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      tableNumber: item?.tableNumber,
      status: item?.status,
      space: item?.space
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredRows = rows?.filter((row) => row?.tableNumber?.toLowerCase().includes(searchTerm?.toLowerCase()));

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
            <Iconify icon="" /> {t('Table')}
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
            {t('Add Table')}
          </Button>
          <AddModifierDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            fetchData={fetchData}
            table={selectedTable}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            isEdit={isEditMode}
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
