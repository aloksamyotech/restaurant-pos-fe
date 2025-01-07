import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import React, { useState } from "react";

 export const CrossIcon = () => {
     const [dialogOpen, setDialogOpen] = useState(false);
    
      const handleDialogOpen = () => setDialogOpen(true);
      const handleDialogClose = () => setDialogOpen(false);

return (
<IconButton
onClick={handleDialogClose}
sx={{
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'grey',
  '&:hover': {
    color: 'red',
  },
}}
>
<CloseIcon />
</IconButton>
);
};