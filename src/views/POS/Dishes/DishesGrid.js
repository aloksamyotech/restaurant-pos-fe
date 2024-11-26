import React from "react";
import { Grid } from "@mui/material";
import DishCard from "../DishCard/DishCard";

const DishesGrid = ({ dishes }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {dishes.map((dish) => (
        <Grid item key={dish.id}>
          <DishCard
            name={dish.name}
            image={dish.image}
            price={dish.price}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DishesGrid;
