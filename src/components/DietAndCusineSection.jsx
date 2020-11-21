import { Grid, Typography } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../styles/recipe";

const DietAndCusineSection = ({ diets, cuisines }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      {diets.length ? (
        <>
          <Typography
            className={classes.subHeader}
            color="textSecondary"
            variant="h6"
          >
            DIETS
          </Typography>
          <Grid container className={classes.content}>
            {diets.map((item) => (
              <Grid className={classes.gridItem} key={item} item xs={6}>
                <Typography className={classes.diet}>
                  <CheckCircleOutline className={classes.checkedIcon} />
                  {item}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
      {cuisines.length ? (
        <>
          <Typography
            className={classes.subHeader}
            color="textSecondary"
            variant="h6"
          >
            CUISINES
          </Typography>
          <Grid container className={classes.content}>
            {cuisines.map((item) => (
              <Grid className={classes.gridItem} key={item} item xs={6}>
                <Typography className={classes.diet}>
                  <CheckCircleOutline className={classes.checkedIcon} />
                  {item}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default DietAndCusineSection;
