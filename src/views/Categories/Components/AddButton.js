import React, { useState } from "react";
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,Stack,TextField,} from "@mui/material";

const AddButton = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: null });

  
  const handleDialogOpen = () => {setOpen(true)};
  const handleDialogClose = () => {
    setOpen(false);
    setNewCategory({ name: "", image: null }); 
  };

  
  const handleInputChange = (d) => {
    const { name, value } = d.target; 
    setNewCategory((old) => ({ ...old, [name]: value }));
  };

  const handleImageUpload = (d) => {
    const file = d.target?.files[0];
    setNewCategory((old) => ({ ...old, image: URL.createObjectURL(file) }));
  };

  
  const handleAddCategory = () => {
    if (newCategory?.name && newCategory?.image) {
      onAdd({
        id: Date.now(), 
        name: newCategory?.name,
        image: newCategory?.image,
        date: new Date().toLocaleString(),
      });
      handleDialogClose();
    } else {
      alert("Add Category of Dish ");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleDialogOpen}>
        Add
      </Button>

      <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Category Name"
              name="name"
              value={newCategory?.name}
              onChange={handleInputChange}
              fullWidth
            />
            <input
              type="file"
              accept="image"
              onChange={handleImageUpload}
              style={{ marginTop: "8px" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButton;
