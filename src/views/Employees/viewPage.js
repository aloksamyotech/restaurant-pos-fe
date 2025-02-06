import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Stack, Card, Typography, Box, Avatar, Grid, Divider, Button, Tooltip, Breadcrumbs, Link } from '@mui/material';
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

import PermissionCheckBox from './Permissions';

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const fetchUserData = async () => {
    try {
      const response = await getApi(urls?.employee?.getbyid.replace(':id', id));

      setRowData(response?.data || {});
    } catch (error) {
      console.error('Failed to fetch employee data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.user?.deleteuser.replace(':id', id));
      if (response?.status === 200) {
        toast.success('User deleted successfully');
        navigate('/dashboard/user');
      }
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" onClick={() => navigate('/dashboard/pos')} sx={{ cursor: 'pointer' }}>
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" onClick={() => navigate('/dashboard/employees')} sx={{ cursor: 'pointer' }}>
      Employees
    </Link>,
    <Link underline="hover" key="2" color="primary" sx={{ cursor: 'pointer' }}>
      Employee Details
    </Link>
  ];

  return (
    <Container>
      <Stack spacing={3}>
        <Card sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3" component="h2">
              <Iconify icon="" /> Employee Profile
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Card>
        <Card>
          <Box padding={2}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" indicatorColor="primary" textColor="primary">
              <Tab label="Profile" icon={<AccountCircleIcon />} iconPosition="start" />
              <Tab label="Permission" icon={<SettingsIcon />} iconPosition="start" />
            </Tabs>
            <Divider />
            {tabValue === 0 && (
              <Grid container spacing={3} padding={2}>
                <Grid item xs={12} md={9}>
                  <Card>
                    <Box padding={2}>
                      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Personal Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>Full Name:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{[rowData?.firstName, rowData?.lastName].filter(Boolean).join(' ')}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography>
                            <strong>Role:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.role || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>Address:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.address || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>Email:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.email || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            <strong>Mobile:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.phoneNumber || 'N/A'}</Typography>
                        </Grid>
                      </Grid>
                      <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Tooltip title="Delete">
                          <Button variant="contained" color="error" onClick={openDeleteDialog}>
                            <DeleteOutlineIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            )}
            {tabValue === 1 && (
              <Box padding={2}>
                <PermissionCheckBox rowData={rowData} />
              </Box>
            )}
          </Box>
        </Card>
      </Stack>
    </Container>
  );
};

export default ViewPage;
