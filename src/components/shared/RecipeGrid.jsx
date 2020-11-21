import { Button, Card, CardMedia, Grid } from "@material-ui/core";
import { CardActionArea, CardActions, CardHeader } from "@material-ui/core";
import React from "react";
import { useStyles } from "../../styles/gridList";

const RecipeGrid = ({ name, image, onClick }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardActionArea onClick={onClick}>
          <CardHeader className={classes.cardHeader} title={name} />
          <CardMedia className={classes.media} image={image} title={name} />
        </CardActionArea>
        <CardActions>
          <Button onClick={onClick} color="primary">
            See More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RecipeGrid;
