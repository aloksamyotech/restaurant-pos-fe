import React from "react";
import { Box,  Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Container, Typography, Card, CardContent,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


import { Stack } from '@mui/system'
const OverallReport = () => {

    const summaryData = [
        { label: "Total sale amount", value: "29.00$" },
        { label: "Total cost amount", value: "16.00$" },
        { label: "Total discount amount", value: "0.00$" },
        { label: "Total profit amount", value: "13.00$" },
        { label: "Total tax amount", value: "4.93$" },
        { label: "Total payable amount", value: "33.93$" },
      ];
    
      const tableData = [
        {
          trackingId: "202501734",
          customer: "Walking Customer",
          price: "17.00$",
          cost: "10.00$",
          discount: "0.00$",
          profit: "7.00$",
          tax: "2.89$",
          payable: "19.89$",
          createdAt: "20-01-2025, 07:26:34",
          updatedAt: "20-01-2025, 07:26:34",
        },
        {
          trackingId: "202501735",
          customer: "Walking Customer",
          price: "4.00$",
          cost: "2.00$",
          discount: "0.00$",
          profit: "2.00$",
          tax: "0.68$",
          payable: "4.68$",
          createdAt: "20-01-2025, 08:16:02",
          updatedAt: "20-01-2025, 08:16:02",
        },
        {
          trackingId: "202501736",
          customer: "Walking Customer",
          price: "8.00$",
          cost: "4.00$",
          discount: "0.00$",
          profit: "4.00$",
          tax: "1.36$",
          payable: "9.36$",
          createdAt: "20-01-2025, 07:39:59",
          updatedAt: "20-01-2025, 07:39:59",
        },
      ];


    return (
        <>
            <Stack direction="row" spacing={50}>
                <Typography variant="h1" color="Highlight" sx={{}}>Overall Report</Typography>
                <Typography variant="h4" >Report created at:</Typography>
            </Stack>
          
            <Card sx={{ p: 2, m: 2 }}>
      <Box>
 
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>By Order Type</InputLabel>
              <Select label="By Order Type">
                <MenuItem value={10}>Order Type 1</MenuItem>
                <MenuItem value={20}>Order Type 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>By Duration</InputLabel>
              <Select label="By Duration">
                <MenuItem value={10}>Daily</MenuItem>
                <MenuItem value={20}>Monthly</MenuItem>
                <MenuItem value={30}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

       
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Starting date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ending date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

       
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>By taker</InputLabel>
              <Select label="By taker">
                <MenuItem value={10}>Taker 1</MenuItem>
                <MenuItem value={20}>Taker 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>By Chef</InputLabel>
              <Select label="By Chef">
                <MenuItem value={10}>Chef 1</MenuItem>
                <MenuItem value={20}>Chef 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Checkout by</InputLabel>
              <Select label="Checkout by">
                <MenuItem value={10}>Checkout 1</MenuItem>
                <MenuItem value={20}>Checkout 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Card>

 
    <Box sx={{ p: 2 }}>
     
      <Grid container spacing={2}>
        {summaryData.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Payable</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src=""
                        alt="barcode"
                        style={{ width: "100px", marginRight: "8px" }}
                      />
                      {row.trackingId}
                    </Box>
                  </TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.discount}</TableCell>
                  <TableCell>{row.profit}</TableCell>
                  <TableCell>{row.tax}</TableCell>
                  <TableCell>{row.payable}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography sx={{ mt: 1, textAlign: "right" }} variant="subtitle2">
          Total orders: 3
        </Typography>
      </Box>
    </Box>

    
        </>
    );
};

export default OverallReport;
