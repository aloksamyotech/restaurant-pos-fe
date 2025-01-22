import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import sandwich from '../../../assets/images/sandwich.jpg';

const DishCard = ({ dish, onAddToCart }) => {
  const { id, name, image, price, cost } = dish;
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
      <CardMedia component="img" height="129px" image={sandwich} alt={name} sx={{ borderRadius: '8px', padding: '4px' }} />
      <CardContent sx={{ height: '0', padding: '15px', textAlign: 'center', border: '1px' }}>
        <Typography color="rgb(55 65 81)">{name}</Typography>
        <Typography color="rgb(37 99 235)">Rs.{price.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;
