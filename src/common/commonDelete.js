import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { t } from 'i18next';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Are you sure you want to delete this item?')}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('Cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
