import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

import { useStyles } from "../../styles/commentCard";
import { limitCommentText, formatDate } from "../../utils/helpers";
import { UserContext } from "../../context/user";

const CommentCard = ({ comment, onSetComment, onDeleteComment }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [smallText, largeText] = limitCommentText(comment.text);
  const updatedAt = formatDate(comment.updatedAt, true);
  const lastname = comment.userId.lastname.toLowerCase();
  const firstname = comment.userId.firstname.toLowerCase();
  return (
    <Card>
      <CardContent>
        <div className={classes.centerGroup}>
          <AccountCircle color="secondary" className={classes.userIcon} />
          <Typography className={classes.subHeader} color="textPrimary">
            {lastname} {firstname}
          </Typography>
        </div>
        <div className={classes.centerGroup}>
          <Rating
            precision={1}
            value={parseFloat(comment.rating)}
            size="small"
            readOnly
          />
          <Typography
            className={classes.subHeader}
            style={{ fontWeight: "bold" }}
            color="primary"
          >
            Verified purchase
          </Typography>
        </div>
        <Typography
          className={classes.spacedText}
          variant="body1"
          color="textSecondary"
        >
          Reviewed on {updatedAt}
        </Typography>
        <Typography
          className={classes.spacedText}
          component="div"
          variant="body1"
          color="textPrimary"
        >
          {smallText} {largeText && <Collapse in={open}>{largeText}</Collapse>}
          {largeText && (
            <Button color="primary" onClick={() => setOpen(!open)}>
              {open ? <ExpandMore /> : <ExpandLess />}
              {open ? `Hide` : `See more`}
            </Button>
          )}
        </Typography>
      </CardContent>
      {user && user._id === comment.userId._id && (
        <CardActions>
          <Grid container>
            <Grid xs={6} sm={8} item></Grid>
            <Grid xs={6} sm={4} item>
              <IconButton color="primary" onClick={() => onSetComment(comment)}>
                <Edit className={classes.editIcon} />
              </IconButton>
              <IconButton onClick={(e) => onDeleteComment(e, comment._id)}>
                <Delete className={classes.deleteIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

export default CommentCard;
