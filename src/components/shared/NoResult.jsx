import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SAD_EMOJI, TO_HOME } from "../../utils/constants";
import { useStyles } from "../../styles/notFound";

const NoResult = ({ search }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper className={classes.paper}>
      <Grid
        justify="center"
        alignItems="center"
        style={{ minHeight: "95vh" }}
        container
      >
        <Grid xs={10} sm={8} md={5} lg={4} item>
          <Typography className={classes.title}>
            No search results found for {search}
          </Typography>
          <center>
            <Avatar src={SAD_EMOJI} className={classes.image} />
          </center>
          <Typography className={classes.subTitle} variant="body1">
            I am sorry. We couldn't find the recipe you are looking for.
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="body2">
            But we have hundreds of more recipes for you to browse
          </Typography>
          <Button
            onClick={() => history.push(TO_HOME)}
            variant="contained"
            size="large"
            className={classes.button}
            fullWidth
          >
            Back To Home Page
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoResult;
