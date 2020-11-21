import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles/recipe";

const NutrientSection = ({ nutrients }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Typography
        className={classes.subHeader}
        color="textSecondary"
        variant="h6"
      >
        NUTRIENTS
      </Typography>
      <Grid container className={classes.content}>
        {nutrients
          .map((nutrient) => (
            <Grid className={classes.gridItem} key={nutrient._id} item xs={6}>
              <Typography className={classes.gridText}>
                {nutrient.amount}
                {nutrient.unit} of {nutrient.name}
              </Typography>
            </Grid>
          ))
          .slice(0, 10)}
      </Grid>
    </Grid>
  );
};

export default NutrientSection;
