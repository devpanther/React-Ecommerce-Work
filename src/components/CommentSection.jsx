import React, { useContext } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useStyles } from "../styles/recipe";
import CommentCard from "../components/shared/CommentCard";
import { UserContext } from "../context/user";

const CommentSection = ({
  orders,
  comments,
  onSetComment,
  onDeleteComment,
  totalRating,
  onShowModal,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const checkIfUserHasOrderedRecipe = () => {
    let hasOrdered = false;
    if (!user) return hasOrdered;

    for (let userOrder of user.orders) {
      if (orders.some((recipeOrder) => recipeOrder._id === userOrder._id)) {
        hasOrdered = true;
      }
    }
    return hasOrdered;
  };

  return (
    <Grid item xs={12}>
      <div className={classes.buttonGroup} style={{ marginBottom: "0.5rem" }}>
        <Typography
          style={{ marginRight: "auto" }}
          color="textPrimary"
          variant="h6"
        >
          Customer reviews
        </Typography>

        {checkIfUserHasOrderedRecipe() && (
          <Button
            variant="contained"
            className={classes.commentButton}
            onClick={onShowModal}
          >
            WRITE A REVIEW
          </Button>
        )}
      </div>

      <div className={classes.buttonGroup} style={{ marginBottom: "0.5rem" }}>
        <Rating
          precision={0.1}
          value={parseFloat(totalRating)}
          size="small"
          readOnly
        />
        <Typography style={{ marginLeft: "0.5rem" }} variant="body2">
          {totalRating} out of 5
        </Typography>
      </div>
      <Typography style={{ marginBottom: "0.5rem" }} color="textSecondary">
        {comments.length} global ratings
      </Typography>
      <Grid container spacing={2} style={{ margin: "0.5rem -0.4rem" }}>
        {comments.map((comment) => (
          <Grid item xs={12} sm={6} key={comment._id}>
            <CommentCard
              comment={comment}
              onSetComment={onSetComment}
              onDeleteComment={onDeleteComment}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CommentSection;
