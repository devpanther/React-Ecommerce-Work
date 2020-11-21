import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { Favorite, AddShoppingCart, Add, Remove } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

import { useStyles } from "../styles/recipe";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import CommentModal from "../components/CommentModal";
import NutrientSection from "../components/NutrientSection";
import Loading from "../components/shared/Loading";
import DietAndCusineSection from "../components/DietAndCusineSection";
import CommentSection from "../components/CommentSection";
import RecipeCategory from "../components/shared/RecipeCategory";
import { DELETE_COMMENT } from "../mutations/comment";
import { TOGGLE_LIKE } from "../mutations/recipe";
import { RECIPE, RECIPES_BY_CATEGORY } from "../queries/recipe";
import { TO_LOGIN, TO_NOT_FOUND, TO_RECIPES } from "../utils/constants";
import { calculateRating } from "../utils/helpers";

const RecipeDetails = ({ match: { params }, history }) => {
  const classes = useStyles();
  const { data, loading, error, refetch } = useQuery(RECIPE, {
    variables: { _id: params._id },
  });
  const { data: data1, loading: loading1, refetch: refetch1 } = useQuery(
    RECIPES_BY_CATEGORY
  );
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const { user } = useContext(UserContext);
  const {
    cartObj,
    handleAddToCart,
    handleRemoveFromCart,
    isLoading,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const totalRating =
    data && data.recipe ? calculateRating(data.recipe.comments) : 0;

  const encodedUrl = encodeURIComponent(`${TO_RECIPES}/${params._id}`);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await toggleLike({ variables: { recipeId: params._id } });
      refetch();
    } catch (e) {
      if (e.message == "Unauthorized")
        return history.push(
          `${TO_LOGIN}?redirect_to=${encodedUrl}`,
          `${TO_RECIPES}/${params._id}`
        );
    }
  };

  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    try {
      await deleteComment({ variables: { _id: commentId } });
      refetch();
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetComment = (comment) => {
    setSelectedComment(comment);
    setOpen(true);
  };

  const handleShowModal = () => {
    if (!user) {
      return history.push(
        `${TO_LOGIN}?redirect_to=${encodedUrl}`,
        `${TO_RECIPES}/${params._id}`
      );
    }
    setOpen(true);
  };

  const renderCartButton = () => {
    if (cartObj[params._id])
      return (
        <div className={classes.buttonGroup}>
          <IconButton
            className={classes.toggleButton}
            color="primary"
            variant="contained"
            onClick={(e) => handleRemoveFromCart(e, params._id)}
          >
            <Remove />
          </IconButton>
          <Typography
            className={classes.cartNo}
            color="primary"
            variant="body1"
          >
            {cartObj[params._id]}
          </Typography>
          <IconButton
            className={classes.toggleButton}
            color="primary"
            variant="contained"
            onClick={(e) => handleAddToCart(e, params._id)}
          >
            <Add />
          </IconButton>
        </div>
      );

    return (
      <IconButton
        className={classes.iconButton}
        color="primary"
        variant="contained"
        onClick={(e) => handleAddToCart(e, params._id)}
      >
        <AddShoppingCart className={classes.cart} />
      </IconButton>
    );
  };

  useEffect(() => {
    refetch();
    refetch1();
    window.scrollTo(0, 0);
  }, [params._id]);

  if (loading || loading1 || isLoading) return <Loading />;
  if (error) return <Redirect to={TO_NOT_FOUND} />;
  if (data && data1)
    return (
      <Paper className={classes.paper}>
        <Grid container justify="center">
          <Grid item xs={11} md={9} lg={8}>
            <Typography variant="h6" className={classes.name}>
              {data.recipe.name}
            </Typography>
            <Avatar
              src={data.recipe.image}
              className={classes.image}
              variant="square"
            />
            <div className={classes.bar}>
              <Typography className={classes.price}>
                ${data.recipe.pricePerServing}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Rating
                  precision={0.1}
                  value={parseFloat(totalRating)}
                  className={classes.rating}
                  // size="small"
                  readOnly
                />

                <Typography style={{ marginLeft: "0.5rem" }}>
                  {totalRating}
                </Typography>
              </div>
              <IconButton
                className={classes.iconButton}
                onClick={(e) => handleLike(e)}
              >
                {user ? (
                  <Favorite
                    className={
                      data.recipe.likes.includes(user._id)
                        ? classes.heartFull
                        : ""
                    }
                  />
                ) : (
                  <Favorite />
                )}
              </IconButton>
              {renderCartButton()}
            </div>
            <Grid container spacing={2} justify="flex-end">
              <NutrientSection nutrients={data.recipe.nutrients} />
              <DietAndCusineSection
                diets={data.recipe.diets}
                cuisines={data.recipe.cuisines}
              />
            </Grid>

            <RecipeCategory
              data={data1.recipesByCategory}
              name={"You might also like"}
              enableButton={false}
            />
            <CommentSection
              orders={data.recipe.orders}
              comments={data.recipe.comments}
              totalRating={totalRating}
              onShowModal={handleShowModal}
              onSetComment={handleSetComment}
              onDeleteComment={handleDeleteComment}
            />
            <CommentModal
              open={open}
              setOpen={setOpen}
              recipeId={params._id}
              comment={selectedComment}
              setComment={setSelectedComment}
              refetchRecipe={refetch}
            />
          </Grid>
        </Grid>
      </Paper>
    );
};

export default RecipeDetails;
