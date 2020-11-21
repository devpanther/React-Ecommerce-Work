import React, { useContext } from "react";
import { useStyles } from "../../styles/favouriteCard";
import { useStyles as useStyles1 } from "../../styles/recipe";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Launch, Remove } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/cart";
import { TO_RECIPES } from "../../utils/constants";

const CartCard = ({ onDelete, recipe, refetch }) => {
  const classes = useStyles();
  const classes1 = useStyles1();
  const history = useHistory();
  const { cartObj, handleAddToCart, handleRemoveFromCart } = useContext(
    CartContext
  );

  const renderCartButton = () => {
    if (cartObj[recipe._id])
      return (
        <div className={classes1.buttonGroup}>
          <IconButton
            className={classes1.toggleButton}
            color="primary"
            variant="contained"
            onClick={(e) => handleRemoveFromCart(e, recipe._id)}
          >
            {cartObj[recipe._id] > 1 ? <Remove /> : <Delete />}
          </IconButton>
          <Typography
            className={classes1.cartNo}
            color="primary"
            variant="body1"
          >
            {cartObj[recipe._id]}
          </Typography>
          <IconButton
            className={classes1.toggleButton}
            color="primary"
            variant="contained"
            onClick={(e) => handleAddToCart(e, recipe._id)}
          >
            <Add />
          </IconButton>
        </div>
      );
    refetch();
  };
  return (
    <Card className={classes.content}>
      <CardActionArea
        onClick={() => history.push(`${TO_RECIPES}/${recipe._id}`)}
      >
        <CardContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4}>
              <CardMedia className={classes.image} image={recipe.image} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" className={classes.content}>
                {recipe.name}
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                className={classes.content}
              >
                ${recipe.pricePerServing}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-evenly">
          {renderCartButton()}
          <IconButton
            onClick={() => history.push(`${TO_RECIPES}/${recipe._id}`)}
            color="primary"
            className={classes1.iconButton}
          >
            <Launch className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={(e) => onDelete(e, recipe._id)}
            className={classes1.iconButton}
          >
            <Delete className={classes.deleteIcon} />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CartCard;
