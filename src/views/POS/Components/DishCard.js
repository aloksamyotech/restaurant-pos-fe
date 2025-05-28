import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Dummy_Image from '../../../assets/images/Dummy_Image.png';
import { urls } from 'core/constant/urls';


const DishCard = ({ dish, onAddToCart }) => {
  const { id, name, image, price, cost } = dish;
  const currency = localStorage.getItem("$2b$10$ehdPSDmr6P1");

   return (
    <Card
      variant="outlined"
      onClick={() => onAddToCart({ id, name, image, price, cost })}
      sx={{
        margin: '2px',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="100px"
        image={image ? `${urls?.item?.image}${image}` : Dummy_Image}
        alt={name}
        sx={{ borderRadius: '8px', padding: '4px' }}
      />
      <CardContent sx={{ height: '0', padding: '0', textAlign: 'center', border: '0' }}>
        <Typography color="rgb(55 65 81)">{name}</Typography>
        <Typography color="rgb(37 99 235)">{currency} {price.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;
