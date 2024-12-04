import React from "react";
import {Stack,Button,Container,Typography,Card,Box,TextField,Checkbox,IconButton,Grid,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Iconify from "../../ui-component/iconify";
import sandwich from 'assets/images/sandwich.jpg'

const Categories = () => {
  const data = [
    {
      id: 1,
      image: "sandwich", 
      name: "Sandwiches",
      date: "04-12-2024, 05:06:11",
    },
    {
      id: 2,
      image: "sandwich", 
      name: "Paneer",
      date: "04-12-2024, 05:05:10",
    },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={3} justifyContent="space-between">
        <Typography variant="h4" component="h1">
          <Iconify icon="" /> Food Categories
        </Typography>
        <Button variant="contained">Back</Button>
      </Stack>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="Search" variant="outlined" size="small" sx={{ flex: 1 }} />
          <Button variant="contained">Add</Button>
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
        <Card key={item?.id} sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}>
          <Checkbox />
          <Box
            component="img"
            src={item?.image}
            alt={item?.name}
            sx={{ width: 100, height: 100, borderRadius: 2, ml: 1 }}
          />
          <Box sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h6">{item?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {item?.date}
            </Typography>
          </Box>
          <Button variant="contained">View</Button>
        </Card>
      ))}
    </Container>
  );
};

export default Categories;
