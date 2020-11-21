import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../../styles/category";
import RecipeCard from "./RecipeCard";

const RecipeCategory = ({ data, name, enableButton }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        {enableButton && (
          <Button style={{ marginLeft: "1rem" }} color="primary">
            Order now
          </Button>
        )}
      </div>
      <Grid
        className={classes.gridContainer}
        container
        spacing={2}
        alignItems="center"
      >
        {data.map((recipe) => (
          <Grid item xs="auto" key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

RecipeCategory.defaultProps = {
  enableButton: true,
};

export default RecipeCategory;
