import React, { useState, useEffect } from "react";
import {
  Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import sandwich from "assets/images/sandwich.jpg"
import AddCategoriesDialog from "./Components/AddCategories";
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from "react-i18next";
import { urls } from "core/constant/urls";
import {getApi} from 'core/apis/apiClient.js';


const Categories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const handleAddCategory = (newCategory) => {
    setData((old) => [...old, newCategory]);
  };

  const fetchData = async () => {
   

      const response = await getApi(urls?.foodCategory.get);
      console.log(response.data);
      setData(response.data);
     
  };

  useEffect(() => {
    
    fetchData();
  }, []);


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
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
      Food
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Categories
    </Typography>,
  ];

  return (
    <Container>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> {t('Food Categories')}
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
          <AddCategoriesDialog open={dialogOpen} onClose={handleDialogClose} />

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

      {data.map((item) => (
        <Card key={item?._id} sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}>
          <Checkbox />
          <Box
            component="img"
            src={`http://localhost:7200/${item.image}`}
            
            alt={item?.categoryName}
            sx={{ width: 100, height: 100, borderRadius: 2, ml: 1 }}
          />
          <Box sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h3">{item?.categoryName}</Typography>
            <Typography variant="body1" color="textSecondary">
              {item?.desc}
            </Typography>
            <Typography variant="body2" color={item?.isAvailable ? "success.main" : "error.main"}>
              {item?.isAvailable ? "Available" : "Not Available"}
            </Typography>
          </Box>
          <Button variant="contained">View</Button>
        </Card>
      ))}
    </Container>
  );
};

export default Categories;
