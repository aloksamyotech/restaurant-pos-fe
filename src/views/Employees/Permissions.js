import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { urls } from 'core/constant/urls';
import { updateApi } from 'core/apis/apiClient.js';
import { Box } from '@mui/system';
import { t } from 'i18next';

const userPermissions = [
  t('Dashboard'),
  t('POS'),
  t('Order'),
  t('Categories'),
  t('Items'),
  t('Modifiers'),
  t('Ingredients'),
  t('Expense Type'),
  t('Expenses'),
  t('Overall Report'),
  t('Employees'),
  t('Customers'),
  t('Expense Report'),
  t('Kitchen'),
  t('Table')
];

const PermissionCheckBox = ({ rowData, fetchData }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rowData?.permissions) {
      setSelectedPermissions(rowData.permissions);
    }
  }, [rowData]);

  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updateApi(urls?.employee?.updatePermissions.replace(':id', rowData?._id), {
        permissions: selectedPermissions
      });

      fetchData();
      if (response.success) {
        toast.success(t('Permissions updated successfully!'));
      } else {
        toast.error(t('Failed to update permissions.'));
      }
    } catch (error) {
      toast.error(error.response?.message || t('An error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>{t('Select User Permissions')}</h3>
      <FormGroup style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', flexDirection: 'row' }}>
        {userPermissions.map((permission) => (
          <FormControlLabel
            key={permission}
            control={<Checkbox checked={selectedPermissions.includes(permission)} onChange={() => handleCheckboxChange(permission)} />}
            label={permission}
            style={{ flex: '1 1 200px' }}
          />
        ))}
      </FormGroup>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : t('Update Permissions')}
        </Button>
      </Box>
    </div>
  );
};

export default PermissionCheckBox;
