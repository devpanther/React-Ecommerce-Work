import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Loading from "../components/shared/Loading";
import { useStyles } from "../styles/paper";
import { useHistory } from "react-router-dom";
import { TO_ADDRESSES } from "../utils/constants";
import AddressCard from "../components/shared/AddressCard";
import { AddressContext } from "../context/address";

const Addresses = () => {
  const classes = useStyles();
  const { addresses, handleDelete, refetchAddresses, loading } = useContext(
    AddressContext
  );
  const history = useHistory();

  useEffect(() => {
    refetchAddresses();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;

  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" style={{ minHeight: "95vh" }} container>
        <Grid xs={10} sm={8} md={5} lg={4} item>
          <center>
            <Typography style={{ margin: "2rem 0" }} variant="h5">
              {addresses.length ? `Your Addresses` : `You have no address`}
            </Typography>
          </center>

          <Button
            fullWidth
            style={{ color: "#fff", padding: "0.7rem 0", marginBottom: "2rem" }}
            variant="contained"
            color="primary"
            onClick={() => history.push(TO_ADDRESSES + "/new")}
          >
            ADD A NEW ADDRESS
          </Button>
          <Grid justify="center" spacing={2} container>
            {addresses.map((address) => (
              <Grid key={address._id} item xs="auto">
                <AddressCard
                  onDelete={handleDelete}
                  key={address._id}
                  address={address}
                  enableEditBtn={true}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Addresses;
