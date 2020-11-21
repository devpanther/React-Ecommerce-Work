import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { Close, ThumbUp } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

import useForm from "../hooks/useForm";
import { ADD_COMMENT, UPDATE_COMMENT } from "../mutations/comment";
import { useStyles } from "../styles/creditCards";

const CommentModal = ({
  open,
  recipeId,
  comment,
  setOpen,
  setComment,
  refetchRecipe,
}) => {
  const classes = useStyles();
  const [addComment] = useMutation(ADD_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);

  const {
    renderButton,
    setSubmitted,
    setError,
    setFormErrors,
    renderError,
    setFormData,
    formData,
  } = useForm({ text: "", rating: 0 });

  useEffect(() => {
    if (comment) {
      setFormData({ text: comment.text, rating: comment.rating });
    }
  }, [comment]);

  useEffect(() => {
    if (formData.text && formData.rating) {
      setFormErrors({});
    } else {
      setFormErrors({ text: "", rating: 0 });
    }
  }, [formData]);

  const handleReset = () => {
    setFormData({ text: "", rating: 0 });
    setError("");
    setComment(null);
    setSubmitted(false);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (comment) {
      try {
        await updateComment({ variables: { ...formData, _id: comment._id } });
        handleReset();
        refetchRecipe();
      } catch (error) {
        setSubmitted(false);
        setError(error.message);
      }
      return;
    }
    try {
      await addComment({ variables: { ...formData, recipeId } });
      handleReset();
      refetchRecipe();
    } catch (error) {
      setSubmitted(false);
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <IconButton
        className={classes.closeButton}
        color="primary"
        onClick={handleReset}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <center>{renderError()}</center>
        <center>
          <IconButton>
            <ThumbUp className={classes.icon} color="primary" />
          </IconButton>
        </center>
        <center>
          <Typography className={classes.modalTitle} variant="h5">
            Add a comment
          </Typography>
        </center>
        <center>
          <Rating
            precision={1}
            value={formData.rating}
            size="large"
            name="rating"
            style={{ marginBottom: "1.5rem" }}
            onChange={(e, value) => setFormData({ ...formData, rating: value })}
          />
        </center>
        <center>
          <TextareaAutosize
            rowsMin={10}
            value={formData.text}
            placeholder="Leave a comment"
            className="comment-area"
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </center>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              {renderButton("SEND MESSAGE")}
            </form>
          </Grid>
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;
