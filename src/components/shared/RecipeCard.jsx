import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "../../styles/card";
import { calculateRating } from "../../utils/helpers";

const RecipeCard = ({ recipe, stretch }) => {
  const classes = useStyles();
  const history = useHistory();
  const totalRating = calculateRating(recipe.comments);
  return (
    <Card
      className={stretch ? classes.stretchCard : classes.card}
      variant="elevation"
    >
      <CardActionArea onClick={() => history.push(`/recipes/${recipe._id}`)}>
        <CardHeader
          className={classes.cardHeader}
          title={recipe ? recipe.name : "Fries"}
          subheader={recipe ? "$" + recipe.pricePerServing : "$20"}
        />
        <CardMedia
          className={classes.media}
          image={
            recipe
              ? recipe.image
              : "https://kenzy-ecommerce.s3.af-south-1.amazonaws.com/fries.jpg"
          }
          title={recipe ? recipe.name : "Fries"}
        />
      </CardActionArea>
      <CardActions>
        {recipe.likes.length ? (
          <Favorite className={classes.heartFull} />
        ) : (
          <FavoriteBorder />
        )}
        <Typography color="textPrimary">
          {recipe ? recipe.likes.length : 0}
        </Typography>
        {totalRating ? (
          <div className={classes.centerGroup}>
            <Rating
              precision={0.1}
              value={parseFloat(totalRating)}
              size="small"
              readOnly
            />
            <Typography style={{ marginLeft: "0.5rem" }} color="textSecondary">
              {`(${recipe.comments.length})`}
            </Typography>
          </div>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
