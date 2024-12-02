import React from "react";
import { Grid } from "@mui/material";
import DishCard from "./DishCard";

const DishesGrid = ({ dishes, onAddToCart}) => {
  return (
    <Grid container spacing={0} justifyContent="flex-start" sx={{ margin: 0 }}>
      {dishes.map((dish) => (
        <Grid item key={dish.id} sx={{ padding: 0, margin: 0 }}>
          <DishCard
          
            name={dish.name}
            image={dish.image}
            price={dish.price}
            onAddToCart={()=> onAddToCart(dish)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DishesGrid;
