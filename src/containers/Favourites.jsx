import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import FavouriteRecipeCard from "../components/shared/FavouriteRecipeCard";
import Loading from "../components/shared/Loading";
import { useStyles } from "../styles/paper";
import { FAVORITE_RECIPES } from "../queries/recipe";
import { TOGGLE_LIKE } from "../mutations/recipe";
import { useHistory } from "react-router-dom";
import { TO_HOME } from "../utils/constants";

const Favourites = () => {
  const classes = useStyles();
  const { data, loading, refetch } = useQuery(FAVORITE_RECIPES, {
    variables: { liked: true },
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  const history = useHistory();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await toggleLike({ variables: { recipeId: id } });
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" style={{ minHeight: "95vh" }} container>
        <Grid xs={10} sm={7} md={5} lg={4} item>
          <Typography style={{ margin: "2rem 0" }} variant="h5">
            {data.recipesByCategory.length
              ? `Your Favourites (${data.recipesByCategory.length} item${
                  data.recipesByCategory.length > 1 ? "s" : ""
                })`
              : `Your Favourite List Is Empty`}
          </Typography>
          {data.recipesByCategory.map((recipe) => (
            <FavouriteRecipeCard
              onDelete={handleDelete}
              key={recipe._id}
              recipe={recipe}
            />
          ))}
          <Button
            fullWidth
            style={{ color: "#fff", padding: "0.7rem 0" }}
            variant="contained"
            color="primary"
            onClick={() => history.push(TO_HOME)}
          >
            CONTINUE SHOPPING
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Favourites;
