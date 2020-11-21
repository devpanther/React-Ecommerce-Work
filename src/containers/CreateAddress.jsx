import React from "react";
import AddressForm from "../components/shared/AddressForm";
import { Grid, Paper } from "@material-ui/core";
import { useStyles } from "../styles/paper";

const CreateAddress = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" style={{ minHeight: "95vh" }} container>
        <Grid xs={10} sm={7} md={5} lg={4} item>
          <AddressForm title={"Add an address"} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateAddress;
