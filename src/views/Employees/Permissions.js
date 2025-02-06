import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import { urls } from 'core/constant/urls';
import { updateApi } from 'core/apis/apiClient.js';
import { Box } from '@mui/system';
const userPermissions = [
  'Dashboard',
  'POS',
  'Order',
  'Categories',
  'Items',
  'Modifiers',
  'Ingredients',
  'Expense Type',
  'Expenses',
  'Overall Report',
  'Employees',
  'Customers'
];
const PermissionCheckBox = ({ rowData }) => {
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
      if (response.success) {
        toast.success('Permissions updated successfully!');
      } else {
        toast.error('Failed to update permissions.');
      }
    } catch (error) {
      toast.error(error.response?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h3>Select User Permissions</h3>
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Permissions'}
        </Button>
      </Box>
    </div>
  );
};
export default PermissionCheckBox;
