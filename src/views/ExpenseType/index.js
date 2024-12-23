import React, { useState,useEffect } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import AddExpensesTypeDialog from "./AddExpensesType";
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { urls } from "core/constant/urls";
import {getApi} from 'core/apis/apiClient.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDialog from "./action";
import {deleteApi} from 'core/apis/apiClient.js';



const Categories = () => {

  
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/" onClick={handleClick}>
      <HomeIcon />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="primary"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Expenses Type
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Expenses
    </Typography>,
  ];

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

       const handleEditDialogOpen = (tag) => {
        console.log("tag=======", tag)
        setSelectedTag(tag); 
        setEditDialogOpen(true); 
      };
       const handleEditDialogClose = () => setEditDialogOpen(false);

  function handleClick(event) {
    event?.preventDefault();
    console?.info('You clicked a breadcrumb.');
  }

  const columns = [
    { field: 'serial', headerName: 'S.No', flex:1,headerAlign: 'center',align: 'center',},
    
    {
      field: 'name',
      headerName: 'Expenses Type',
      flex:1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex:1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    
   
    
    
    
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
  
      flex:1,
      renderCell: (params) => (
  
        <Stack  direction="row" spacing={4}>
        
        <EditIcon color="primary" onClick={() => handleEditDialogOpen(params.row)}/>
        <EditDialog open={editDialogOpen} onClose={handleEditDialogClose} 
        tag={selectedTag}/>

        <DeleteIcon sx={{color:"red"}}
         onClick={async () => {
          if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteApi(urls?.expenseType.delete.replace(':id', params.row.id));
            setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
            alert('Item deleted successfully');
          }
        }}
        />
        </Stack>
  
  
      ),
    }
  ];
  
  const [rows, setRows] = useState([]);
       const fetchData = async () => {
         
      
            const response = await getApi(urls?.expenseType.get);
            const formattedData = response.data.map((item, index) => ({
              id: item._id,
              serial: index + 1,
              name: item.name,
              desc: item.desc,
              isAvailable: item.true
              
            }));
            console.log("formattedData",formattedData); 
            setRows(formattedData);
            
           
        };
      
        useEffect(() => {
          
          fetchData();
        }, []);
  

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Expenses Type
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="Search" variant="outlined" size="small" sx={{ flex: 1 }} />
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            Add Item
          </Button>
          <AddExpensesTypeDialog open={dialogOpen} onClose={handleDialogClose} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Sort by:</Typography>
            <TextField
              select
              size="small"
              defaultValue="Created"
              SelectProps={{ native: true }}
              sx={{ width: "120px" }}
            >
              <option value="Created">Created</option>
              <option value="Name">Name</option>
            </TextField>
            <IconButton>
              <SortIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      <Card>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
           
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}

            
          />
        </Box>
        </Card >
    </Container>
  );
};

export default Categories;
