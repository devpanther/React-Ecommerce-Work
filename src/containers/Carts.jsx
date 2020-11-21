import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Loading from "../components/shared/Loading";
import { useStyles } from "../styles/paper";
import { useHistory } from "react-router-dom";
import { TO_HOME, TO_SELECT_ADDRESS } from "../utils/constants";
import CartCard from "../components/shared/CartCard";
import { CartContext } from "../context/cart";
import { calculateTotalPrice } from "../utils/helpers";

const Carts = () => {
  const classes = useStyles();
  const {
    recipes,
    handleDelete,
    refetchRecipe,
    refetchCart,
    cartObj,
    carts,
    isLoading,
  } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    refetchRecipe();
    refetchCart();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" style={{ minHeight: "95vh" }} container>
        <Grid xs={10} sm={8} md={5} lg={4} item>
          <Typography style={{ margin: "2rem 0" }} variant="h5">
            {recipes.length
              ? `Your Shopping Cart (${carts.length} item${
                  recipes.length > 1 ? "s" : ""
                }) USD ${calculateTotalPrice(recipes, cartObj)}`
              : `Your Shopping Cart Is Empty`}
          </Typography>
          {recipes.map((recipe) => (
            <CartCard
              onDelete={handleDelete}
              key={recipe._id}
              recipe={recipe}
              refetch={refetchRecipe}
            />
          ))}
          <Button
            fullWidth
            style={{ color: "#fff", padding: "0.7rem 0", marginBottom: "1rem" }}
            variant="contained"
            color="primary"
            onClick={() => history.push(TO_HOME)}
          >
            CONTINUE SHOPPING
          </Button>
          {carts.length ? (
            <Button
              fullWidth
              style={{ color: "#fff", padding: "0.7rem 0" }}
              variant="contained"
              color="primary"
              onClick={() => history.push(TO_SELECT_ADDRESS)}
            >
              PROCEED TO CHECKOUT
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Carts;
