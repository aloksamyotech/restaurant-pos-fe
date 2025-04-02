import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link, Popover } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import { deleteApi } from 'core/apis/apiClient.js';
import DeleteConfirmationDialog from '../../common/commonDelete';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchBar from 'common/searchBar';
import { Snackbar } from '@mui/material';
import Dummy_Image from '../../../src/assets/images/Dummy_Image.png';
import ItemDialog from './addEditItem';
import { useNavigate } from 'react-router';
import BulkUploadCategory from './bulkUploadButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Categories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      {t('Food Items')}
    </Link>
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleDialogOpen = () => {
    setSelectedTag(null);
    setIsEditMode(false);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditDialogOpen = (tag) => {
    setSelectedTag(tag);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
   const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
    const handleBulkDialogOpen = () => {
      setBulkDialogOpen(true);
    };
    const handleBulkDialogClose = () => setBulkDialogOpen(false);

  const columns = [
    {
      field: 'serial',
      headerName: t('S.No'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: t('Item Name'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'desc',
      headerName: t('Description'),
      flex: 1,
      headerAlign: t('center'),
      align: 'center',
      
    },

    {
      field: 'image',
      headerName: t('Dish Image'),
      width: 150,
       renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="Category" style={{ maxWidth: '50px', height: '50px', borderRadius: "50%",
            objectFit: "cover" }} />
        ) : (
          <Typography>No Image</Typography>
        )
    },

    {
      field: 'cost',
      headerName: t('Preparing Cost'),
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'price',
      headerName: t('Selling Price'),
      type: 'number',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'categoryId',
      headerName: t('Category'),
      type: 'string',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'ingredient',
      headerName: t('Ingredients'),
      type: [],
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
            open={deleteDialogOpen === params?.row?.id}
            onClose={() => setDeleteDialogOpen(null)}
            onConfirm={async () => {
              await deleteApi(urls?.item?.delete?.replace(':id', params?.row?.id));
              setRows((prevRows) => prevRows.filter((row) => row?.id !== params?.row?.id));
              await fetchData();
              setSnackbarMessage(t('Item deleted successfully!'));
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

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const response = await getApi(urls?.item?.get);
    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      name: item?.name,
      desc: item?.desc || '--',
      image: item?.itemImage ? `${urls?.item?.image}${item.itemImage}` : Dummy_Image,
      cost: item?.cost,
      price: item?.price,
      categoryId: item?.categoryId?.categoryName,
      itemCategoryId: item?.categoryId?._id,
      ingredient: item?.ingredientId?.map((ingredient) => ingredient?.name).join(', ') || 'N/A',
      ingredientId: item?.ingredientId?.map((ingredient) => ingredient?._id) || 'N/A'
    }));


    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredRows = rows?.filter((row) => row?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));

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
            <Iconify icon="" /> {t('Food Items')}
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
            {t('Add Item')}
          </Button>

          <ItemDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            fetchData={fetchData}
            itemData={selectedTag}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            isEdit={isEditMode}
          />
          <Button variant="contained" color="primary" onClick={handleBulkDialogOpen}>
            {t('Bulk Upload')}
          </Button>
          <BulkUploadCategory
            open={bulkDialogOpen}
            fetchData={fetchData}
            onClose={handleBulkDialogClose}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />
          
        </Stack>
      </Card>

      <Card>
        <Box sx={{ height: 550, width: '100%' }}>
          <DataGrid rows={filteredRows} rowHeight={50} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Card>
    </Container>
  );
};

export default Categories;
