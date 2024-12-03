import * as React from 'react';
import Card from '@mui/material/Card';
import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const kitchen = () => {
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


        </>
    )
}
export default kitchen;