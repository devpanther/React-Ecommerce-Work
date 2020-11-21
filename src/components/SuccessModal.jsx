import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { AddressContext } from "../context/address";
import { CardContext } from "../context/card";
import { useStyles } from "../styles/creditCards";
import { TO_HOME } from "../utils/constants";

const SuccessModal = ({ cardId, open, addressId }) => {
  const classes = useStyles();
  const { cards } = useContext(CardContext);
  const { addresses } = useContext(AddressContext);
  const history = useHistory();

  const selectedCard = cards.filter((card) => card._id === cardId)[0];
  const selectedAddress = addresses.filter(
    (address) => address._id === addressId
  )[0];
  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogContent>
        <center>
          <CheckCircle className={classes.icon} color="primary" />
        </center>
        <center>
          <Typography className={classes.modalTitle} variant="h5">
            Thank you for your purchase
          </Typography>
        </center>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}></Grid>
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.subHeader}
              variant="body1"
              color="textSecondary"
            >
              SHIPPING ADDRESS
            </Typography>
            {selectedAddress && (
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.content}>
                  {selectedAddress.name}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  {selectedAddress.address} {selectedAddress.postalCode}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  {selectedAddress.city}
                  {", "}
                  {selectedAddress.state}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  {selectedAddress.country}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              className={classes.subHeader}
              variant="body1"
              color="textSecondary"
            >
              BILLING ADDRESS
            </Typography>
            {selectedCard && (
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.content}>
                  {selectedCard.name}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  **** *** **** {selectedCard.last4}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  Expires {selectedCard.exp_month}/{selectedCard.exp_year}
                </Typography>
                <Typography
                  style={{ textTransform: "uppercase" }}
                  variant="body2"
                  className={classes.content}
                >
                  {selectedCard.brand} card
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} md={2}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
            <Button
              fullWidth
              className={classes.btn}
              onClick={() => history.push(TO_HOME)}
              variant="contained"
            >
              CONTINUE SHOPPING
            </Button>
          </Grid>
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
