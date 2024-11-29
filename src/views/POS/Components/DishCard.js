import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import sandwich from 'assets/images/sandwich.jpg'



const DishCard = ({ name, image, price,onAddToCart }) => {
  return (
    <Card onClick={onAddToCart} sx={{ maxWidth: 250, margin: 2,cursor: "pointer"}}>
      <CardMedia
        component="img"
        height="100"
        image={sandwich}
        alt={name}
        
      />
      <CardContent >
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body 2" color="text.secondary">
          Rs.{price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;
