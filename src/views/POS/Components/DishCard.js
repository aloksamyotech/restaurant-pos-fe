import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import sandwich from 'assets/images/sandwich.jpg'
import { margin } from "@mui/system";



const DishCard = ({ name, image, price,onAddToCart }) => {
  return (
    <Card variant="outlined" onClick={onAddToCart} sx={{m:"2px"}} >
      <CardMedia
        component="img"
        height="150px"
        image={sandwich}
        alt={name}
        sx={{ borderRadius: 2, p: 0.5 }}
        
      />
      <CardContent sx={{height:'40px',padding: '5px',textAlign: 'center'}} >
        <Typography color="rgb(55 65 81)">{name}</Typography>
        <Typography color="rgb(37 99 235)">
          Rs.{price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;
