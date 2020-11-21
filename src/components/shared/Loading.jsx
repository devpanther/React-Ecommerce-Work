import { CircularProgress, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../../styles/loading";

const Loading = () => {
  const classes = useStyles();
  return (
    <Paper square className={classes.paper}>
      <span className={classes.group}>
        <CircularProgress size={40} className={classes.spinner} />
        <Typography className={classes.text} variant="body1">
          Loading ...
        </Typography>
      </span>
    </Paper>
  );
};

export default Loading;
