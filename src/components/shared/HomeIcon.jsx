import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    display: "flex",
  },
  button: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: orange[600],
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
}));

const HomeIcon = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.button} onClick={() => history.goBack()}>
          <ArrowBack className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HomeIcon;
