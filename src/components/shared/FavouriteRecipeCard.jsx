import React from "react";
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
import { Delete, Launch } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useStyles } from "../../styles/favouriteCard";
import { TO_RECIPES } from "../../utils/constants";

const FavouriteRecipeCard = ({ onDelete, recipe }) => {
  const classes = useStyles();
  const history = useHistory();
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
        <Grid container>
          <Grid xs={6} sm={8} item></Grid>
          <Grid xs={6} sm={4} item>
            <IconButton
              onClick={() => history.push(`${TO_RECIPES}/${recipe._id}`)}
              color="primary"
            >
              <Launch className={classes.icon} />
            </IconButton>
            <IconButton onClick={(e) => onDelete(e, recipe._id)}>
              <Delete className={classes.deleteIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default FavouriteRecipeCard;
