import * as React from 'react';
import Card from '@mui/material/Card';
import { Avatar, Button, CardContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import FastfoodIcon from "@mui/icons-material/Fastfood";


const kitchen = () => {
    const orders = [
        { orderId: "1", name: "Sandwich", quantity: 2 },
        { orderId: "2", name: "Kajucurry", quantity: 1 },
        { orderId: "3", name: "Rasmalia", quantity: 3 },
      ];
    return (
        <>
            <Card sx={{ Color: "#f1f8e9", p: 2 }}>
                <FormControl sx={{ width: "200px" }} >
                    <InputLabel id="order-label">Display Order</InputLabel>


                    <Select label="Display All Order" color='info'  >
                        <MenuItem value="All">Display All Order </MenuItem>
                        <MenuItem value="Dining">By Order Type:Dining </MenuItem>
                        <MenuItem value="Table">By Order Type:Table</MenuItem>
                        <MenuItem value="Delivery">By Order Type:Delivery</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search "
                    variant="outlined"
                    sx={{ width: '200px', ml: "15px" }}

                />
                 
                
                <Button variant="outlined" sx={{ width: '100px', ml: "15px",padding:"12px",borderRadius:"15px" }}>
                    Reload
                </Button>
            </Card>

            <Grid container spacing={2} justifyContent="flex-start">
      {orders.map((order) => (
        <Grid item key={order.orderId}>
          <Card sx={{ margin: 1, padding: 2, maxWidth: 400,bgcolor:'#cfd8dc'  }}>
            <CardContent sx={{m:2}}>

             <FastfoodIcon sx={{ marginRight: 2, color: "#ff5722" }} />
              <Typography variant="h6">Order ID: {order?.orderId}</Typography>
              <Typography variant="body1">Dish Name: {order?.name}</Typography>
              <Typography variant="body2">Quantity: {order?.quantity}</Typography>
              
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
    )
}
export default kitchen;