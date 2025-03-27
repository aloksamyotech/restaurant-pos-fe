import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Stack, Card, Typography, Box, Avatar, Grid, Divider, Button, Tooltip, Breadcrumbs, Link, Snackbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getApi, deleteApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import { toast } from 'react-toastify';
import Iconify from 'ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import DeleteConfirmationDialog from 'common/Delete';
import PermissionCheckBox from './Permissions';
import EditIcon from '@mui/icons-material/Edit';
import EditEmployee from './Employees';
import { t } from 'i18next';

const ViewPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await getApi(urls?.employee?.getbyid.replace(':id', id));
      setRowData(response?.data || {});
    } catch (error) {
      console.error(t('Failed to fetch employee data:'), error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const openEditDialog = () => setEditDialogOpen(true);
  const closeEditDialog = () => setEditDialogOpen(false);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.employee?.delete.replace(':id', id));
      if (response.success) {
        toast.success(t('Employee deleted successfully'));
        navigate('/dashboard/employees');
      }
    } catch (error) {
      toast.error(t('Failed to delete user'));
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" onClick={() => navigate('/dashboard/employees')} sx={{ cursor: 'pointer' }}>
      {t('Employees')}
    </Link>,
    <Link underline="hover" key="3" color="primary" sx={{ cursor: 'pointer' }}>
      {t('Employee Details')}
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
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack spacing={3}>
        <Card sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3" component="h2">
              <Iconify icon="" /> {t('Employee Profile')}
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Card>
        <Card>
          <Box padding={2}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" indicatorColor="primary" textColor="primary">
              <Tab label={t('Profile')} icon={<AccountCircleIcon />} iconPosition="start" />
              <Tab label={t('Permission')} icon={<SettingsIcon />} iconPosition="start" />
            </Tabs>
            <Divider />
            {tabValue === 0 && (
              <Grid container spacing={3} padding={2}>
                <Grid item xs={12} md={9}>
                  <Card>
                    <Box padding={2}>
                      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        {t('Personal Details')}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>{t('Full Name')}:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{[rowData?.firstName, rowData?.lastName].filter(Boolean).join(' ')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>{t('Role')}:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.role || t('N/A')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>{t('Address')}:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.address || t('N/A')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>{t('Email')}:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.email || t('N/A')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>{t('Mobile')}:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.phoneNumber || t('N/A')}</Typography>
                        </Grid>
                      </Grid>
                      <Stack direction="row" spacing={3} sx={{ justifyContent: 'flex-end', mt: 1 }}>
                        <Box display="flex">
                          <Tooltip title={t('Delete')}>
                            <Button variant="contained" color="error" onClick={() => openDeleteDialog(rowData._id)}>
                              <DeleteOutlineIcon />
                            </Button>
                          </Tooltip>
                        </Box>
                        <Box display="flex">
                          <Tooltip title={t('Edit')}>
                            <Button variant="contained" color="primary" onClick={openEditDialog}>
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <EditEmployee
                            open={editDialogOpen}
                            onClose={closeEditDialog}
                            fetchData={fetchUserData}
                            setSnackbarOpen={setSnackbarOpen}
                            setSnackbarMessage={toast.success}
                            employeeData={rowData}
                            editMode={true}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            )}
            {tabValue === 1 && (
              <Box padding={2}>
                <PermissionCheckBox rowData={rowData} fetchData={fetchUserData} />
              </Box>
            )}
          </Box>
        </Card>
      </Stack>
    </Container>
  );
};

export default ViewPage;
