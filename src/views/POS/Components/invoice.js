import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Paper, Button, Card } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";


const Invoice = ({ order }) => {
    const { items, totalPrice } = order || {
        items: [],
        totalPrice: 0,
    };
   

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
                        Order ID:
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
                            Total Price:
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


                <Box>
                    {items?.map((item, index) => (
                        <Grid
                            container
                            key={index}
                            spacing={2}
                            sx={{ mb: 2, alignItems: "center" }}
                        >
                            <Grid item xs={6}>
                                <Typography variant="body1">{item?.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Quantity: {item?.quantity}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Typography variant="body1">Rs. {item?.price.toFixed(2)}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Subtotal: Rs. {(item?.price * item?.quantity).toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box textAlign="left">
                    <Typography variant="h4" color="primary">
                        Total: Rs. {totalPrice?.toFixed(2)}
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
