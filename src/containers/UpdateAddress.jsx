import { useQuery } from "@apollo/client";
import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { ADDRESS } from "../queries/address";
import { useStyles } from "../styles/paper";
import Loading from "../components/shared/Loading";

import { TO_NOT_FOUND } from "../utils/constants";
import { Redirect } from "react-router-dom";
import AddressForm from "../components/shared/AddressForm";

const UpdateAddress = ({ match: { params } }) => {
  const classes = useStyles();
  const { data, error, loading } = useQuery(ADDRESS, {
    variables: { _id: params._id },
  });
  if (loading) return <Loading />;
  if (error) return <Redirect to={TO_NOT_FOUND} />;

  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" style={{ minHeight: "95vh" }} container>
        <Grid xs={10} sm={7} md={5} lg={4} item>
          <AddressForm address={data.address} title={"Update your address"} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UpdateAddress;
