import _ from "lodash";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@material-ui/core";
import { TO_ADDRESSES } from "../../utils/constants";

import {
  validateWithMessage,
  validateNameWithMessage,
} from "../../utils/validation";
import { ADD_ADDRESS, UPDATE_ADDRESS } from "../../mutations/address";
import { useStyles } from "../../styles/form";
import useForm from "../../hooks/useForm";

const obj = {
  name: "",
  postalCode: "",
  country: "",
  address: "",
  city: "",
  state: "",
};

const AddressForm = ({ title, address }) => {
  const {
    renderInput,
    renderButton,
    renderError,
    formData,
    setSubmitted,
    setError,
    setFormData,
    setFormErrors,
  } = useForm({
    ...obj,
  });
  const classes = useStyles();
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (address) {
      setFormData(
        _.pick(address, [
          "name",
          "address",
          "city",
          "state",
          "country",
          "postalCode",
        ])
      );
      setFormErrors({});
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!address) {
      try {
        await addAddress({ variables: { ...formData } });
        location.state
          ? history.push(location.state)
          : history.push(TO_ADDRESSES);
      } catch (err) {
        setSubmitted(false);
        setError(err.message);
      }
    } else {
      try {
        await updateAddress({ variables: { ...formData, _id: address._id } });
        history.push(TO_ADDRESSES);
      } catch (err) {
        setSubmitted(false);
        setError(err.message);
      }
    }
  };

  return (
    <>
      {renderError()}
      <Typography
        style={{ margin: "2rem 0", textAlign: "center" }}
        variant="h5"
      >
        {title}
      </Typography>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderInput(
              "name",
              "Full Name",
              validateNameWithMessage("Please enter a valid name"),
              "John Doe"
            )}
          </Grid>
          <Grid item xs={12}>
            {renderInput(
              "address",
              "Address",
              validateWithMessage("Please enter an address"),
              "Street address or P.O. Box"
            )}
          </Grid>
          <Grid item xs={6}>
            {renderInput(
              "city",
              "City",
              validateWithMessage("Please enter a city"),
              "Lekki"
            )}
          </Grid>
          <Grid item xs={6}>
            {renderInput(
              "postalCode",
              "Postal Code",
              validateWithMessage("Please enter a postal code"),
              "105102"
            )}
          </Grid>
          <Grid item xs={6}>
            {renderInput(
              "country",
              "Country",
              validateWithMessage("Please enter a country"),
              "Nigeria"
            )}
          </Grid>
          <Grid item xs={6}>
            {renderInput(
              "state",
              "State",
              validateWithMessage("Please enter a state"),
              "Lagos"
            )}
          </Grid>
          <Grid item xs={4} md={6}></Grid>
          <Grid item xs={4} md={3}>
            <Button
              onClick={() => history.push(TO_ADDRESSES)}
              className={classes.outlinedBtn}
              color="primary"
              fullWidth
            >
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={4} md={3}>
            {renderButton("SAVE")}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddressForm;
