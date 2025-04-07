import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box, TextField, IconButton, Breadcrumbs, Link, Snackbar, Popover } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { urls } from 'core/constant/urls';
import { getApi, deleteApi } from 'core/apis/apiClient.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from 'common/searchBar';
import DeleteConfirmationDialog from '../../common/commonDelete';
import Dummy_Image from '../../../src/assets/images/Dummy_Image.png';
import CategoryDialog from './Category';
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
    <Link underline="hover" key="2" color="primary" onClick={() => navigate('/dashboard/categories')} sx={{ cursor: 'pointer' }}>
      {t('Food Category')}
    </Link>
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [rows, setRows] = useState([]);
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
    setSelectedCategory(null);
    setIsEditMode(false);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleEditDialogOpen = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setDialogOpen(true);
  };
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const handleBulkDialogOpen = () => {
    setBulkDialogOpen(true);
  };
  const handleBulkDialogClose = () => setBulkDialogOpen(false);

  const fetchData = async () => {
    const response = await getApi(urls?.foodCategory?.get);

    const formattedData = response?.data?.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      name: item?.categoryName,
      desc: item?.desc || '--',
      categoryImage: item?.categoryImage ? `${urls?.item?.image}${item.categoryImage}` : Dummy_Image,
      isAvailable: item?.true
    }));
    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = rows?.filter((row) => row?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));

  const columns = [
    { field: 'serial', headerName: t('S.No'), flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'categoryImage',
      headerName: t('Category Image'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt={t('Category')} style={{ maxWidth: '50px', height: '50px', borderRadius: "75%",
            objectFit: "cover" }} />
        ) : (
          <Typography>{t('No Image')}</Typography>
        )
    },
    {
      field: 'name',
      headerName: t('Category'),
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
            <Stack direction="row" spacing={3} padding={1}>
              <EditIcon
                color="primary"
                onClick={() => handleEditDialogOpen(params.row)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    
                   scale: 1.1
                  }
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
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
                onClick={() => setDeleteDialogOpen(params.row.id)}
              />
              <DeleteConfirmationDialog
                open={deleteDialogOpen === params?.row?.id}
                onClose={() => setDeleteDialogOpen(null)}
                onConfirm={async () => {
                  await deleteApi(urls?.foodCategory?.delete?.replace(':id', params.row.id));
                  setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
                  await fetchData();
                  setSnackbarMessage(t('Category deleted successfully!'));
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
            <Iconify icon="" /> {t('Food Categories')}
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
            {t('Add Category')}
          </Button>

          <CategoryDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            category={selectedCategory}
            fetchData={fetchData}
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
          <DataGrid rows={filteredRows} rowHeight={50} columns={columns} getRowId={(row) => row.id}  />
        </Box>
      </Card>
    </Container>
  );
};

export default Categories;
