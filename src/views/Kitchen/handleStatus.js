import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { updateApi, updateApiPatch } from "core/apis/apiClient";
import { urls } from "core/constant/urls";
import { t } from 'i18next';

const OrderCloseDialog = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { kitchenId, setSnackbarOpen, setSnackbarMessage, fetchData, orderId, customerId } = props;

  const handleConfirm = async () => {
    const response = await updateApiPatch(urls?.kitchen?.updateOrderStatus.replace(':id', kitchenId), {
      status: "Completed",
      orderId: orderId,
    });

    if (response?.success) {
      setSnackbarOpen(true);
      setSnackbarMessage(t('Order Closed Successfully'));
      fetchData();
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(t('Error Closed Successfully'));
    }

    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {t('Close Order')}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Confirm Order Closure')}</DialogTitle>
        <DialogContent>
          {t('Are you sure you want to close this order?')}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">{t('Yes')}</Button>
          <Button onClick={handleClose} color="secondary">{t('No')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderCloseDialog;
