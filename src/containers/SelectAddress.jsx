import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { AddressContext } from "../context/address";
import AddressCard from "../components/shared/AddressCard";
import Loading from "../components/shared/Loading";
import { useStyles } from "../styles/creditCards";
import { TO_ADDRESSES, TO_CHECKOUT } from "../utils/constants";

const SelectAddress = ({ history, location }) => {
  const { addresses, refetchAddresses, error, loading } = useContext(
    AddressContext
  );
  const [addressId, setAddressId] = useState("");
  const [open, setOpen] = useState(true);

  const classes = useStyles();

  const handleSelect = (e) => {
    setAddressId(e.target.value);
  };

  useEffect(() => {
    refetchAddresses();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;

  return (
    <Paper className={classes.paper} square>
      <Grid justify="center" container>
        <Grid xs={10} sm={7} md={5} lg={4} item>
          {error && (
            <center>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  style={{ margin: "1rem 0" }}
                  onClose={() => setOpen(false)}
                >
                  {error.message}
                </Alert>
              </Collapse>
            </center>
          )}
          <center>
            <Typography
              variant="h6"
              style={{ paddingTop: "1rem", marginBottom: "2rem" }}
            >
              {!addresses.length
                ? "Create an address in order to place an order"
                : "Select a shipping address"}
            </Typography>
          </center>
          {!addresses.length && (
            <center>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  history.push(TO_ADDRESSES + "/new", location.pathname)
                }
                className={classes.btn}
              >
                ADD A NEW ADDRESS
              </Button>
            </center>
          )}
          {addressId && (
            <center>
              <Button
                fullWidth
                variant="contained"
                onClick={() => history.push(TO_CHECKOUT, addressId)}
                className={classes.btn}
              >
                DELIVER TO THIS ADDRESS
              </Button>
            </center>
          )}
        </Grid>
      </Grid>
      <Grid spacing={2} alignItems="center" justify="center" container>
        {addresses.map((address) => (
          <Grid key={address._id} xs={"auto"} item>
            <AddressCard
              address={address}
              enableRadioBtn={true}
              selectedValue={addressId}
              onSelect={handleSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default SelectAddress;
