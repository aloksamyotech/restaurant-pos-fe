import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Paper, Button, Card } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router";
import { getApi } from 'core/apis/apiClient.js';
import { urls } from "core/constant/urls";


const Invoice = () => {
   

    const { orderId } = useParams();

   
 const [rowData, setrowdata] = useState({});

  const fetchData = async () => {
    const response = await getApi(urls?.order.getbyid.replace(':id', orderId));
  
   
    const order = response?.data;
   
    

   
    const formattedData = {
      id: order?._id,
      customer: order?.customer || "N/A",
      employee: order?.employee || "N/A",
      totalPrice: order?.totalPrice?.toFixed(2) || "0.00",
      discount: order?.discount?.toFixed(2) || "0.00",
      tax: order?.tax?.toFixed(2) || "0.00",
      paymentStatus: order?.paymentStatus === 1 ? "Paid" : "Unpaid",
      chef: order?.chef || "N/A",
      type: order?.type || "N/A",
      status: order?.status || "Pending",
      expectedTime: order?.expectedTime ? `${order.expectedTime} min` : "N/A",
   
    };
   
    const formattedItemRows = order?.items?.map((item, index) => ({
      id: index + 1,
      serial: index + 1,
      items: item?.name || "N/A",
      price: item?.price?.toFixed(2) || "0.00",
      quantity: item?.quantity || "0",
    })) || [];

    setrowdata(formattedData);
    setitemRow(formattedItemRows);
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);
  


  const columns = [
    {
      field: 'serial', headerName: 'S.No', width: 20, headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'items',
      headerName: 'Item Name',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        
      },
     
     
      {
        field: 'quantity',
        headerName: 'Quantity ',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        
      }
   ];
   const [itemRow, setitemRow] = useState([]); 

    return (
        <Box sx={{ padding: 4, maxWidth: "100%", margin: "0 auto" }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h3" textAlign="center" color="primary" gutterBottom>
                    Invoice
                </Typography>
                <Typography variant="h4" textAlign="Right" color="primary" gutterBottom>
                    Date: {new Date().toLocaleDateString()}
                </Typography>
                <Typography variant="h4" textAlign="left" color="" gutterBottom>
                    Order Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" textAlign="left" color="" >
                        Order ID: {orderId}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Typography variant="h5" textAlign="Right" color="" >
                        Assisted By:
                    </Typography>
                </Box>

                <Typography variant="h4" textAlign="left" color="" gutterBottom>
                    Customer Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack direction="row" spacing={50} sx={{}}>
                    <Stack direction="column" spacing={1} sx={{}}>
                        <Typography variant="h5" textAlign="left" color="" >
                            Name :
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Email :
                        </Typography>

                    </Stack>
                    <Stack direction="column" spacing={1} sx={{}}>
                        <Typography variant="h5" textAlign="left" color="" >
                            Address :
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Phone :
                        </Typography>

                    </Stack>
                </Stack>

                <Typography variant="h4" textAlign="left" color="" sx={{ mt: 3 }} >
                    Payment Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack direction="row" spacing={50} sx={{}}>
                    <Stack direction="column" spacing={1} sx={{}}>
                        <Typography variant="h5" textAlign="left" color="" >
                            Payment Status :
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Payment Type:
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Payment Date:
                        </Typography>

                    </Stack>
                    <Stack direction="column" spacing={1} sx={{}}>
                        <Typography variant="h5" textAlign="left" color="" >
                            Total Price:{rowData?.totalPrice}
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Discount :
                        </Typography>
                        <Typography variant="h5" textAlign="left" color="" >
                            Tax:
                        </Typography>

                    </Stack>
                </Stack>
                <Typography variant="h4" textAlign="left" color="" sx={{ mt: 3 }} >
                    Item Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Card>
                    <Box sx={{ height: 400, }}>
                        <DataGrid
                            rows={itemRow}

                            columns={columns}



                        />
                    </Box>
                </Card >


              

                <Divider sx={{ my: 3 }} />

                <Box textAlign="left">
                    <Typography variant="h4" color="primary">
                        Total: Rs. {rowData?.totalPrice}
                    </Typography>
                </Box>

                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary">
                        Print Invoice
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Invoice;
