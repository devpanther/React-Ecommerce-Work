import { Grid } from "@material-ui/core";
import React from "react";
import RecipeGrid from "./shared/RecipeGrid";
import { data } from "../utils/data";
import { useHistory } from "react-router-dom";

const RecipeGridList = () => {
  const history = useHistory();
  return (
    <Grid container style={{ marginBottom: "2rem" }} spacing={2}>
      {data.map((item) => (
        <RecipeGrid
          name={item.name}
          image={item.image}
          key={item.name}
          onClick={() => history.push(item.path)}
        />
      ))}
    </Grid>
  );
};

export default RecipeGridList;
