import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { updateApiPatch } from "core/apis/apiClient";
import { urls } from "core/constant/urls";
import { t } from 'i18next';

const OrderCloseDialog = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {kitchenId,setSnackbarOpen,setSnackbarMessage,fetchData} = props;

  const handleConfirm = async () => {
    
    const response =  await updateApiPatch(urls?.kitchen?.updateKitchenOrder.replace(':id', kitchenId), {
                status: "Completed"
                });
      if (response.success) {
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
        Close Order
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Order Closure</DialogTitle>
        <DialogContent>
          Are you sure you want to close this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">Yes</Button>
          <Button onClick={handleClose} color="secondary">No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderCloseDialog;
