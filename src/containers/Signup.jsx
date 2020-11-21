import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";

import useForm from "../hooks/useForm";
import { useStyles } from "../styles/form";
import {
  BUSINESS_LOGO,
  TO_LOGIN,
  TO_UNVERIFIED_EMAIL,
} from "../utils/constants";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";
import { REGISTER_USER, VERIFY_EMAIL } from "../mutations/user";
const obj = { firstname: "", lastname: "", email: "", password: "" };

const Signup = () => {
  const classes = useStyles();
  let history = useHistory();
  const {
    renderInput,
    renderButton,
    formData,
    setSubmitted,
    renderError,
    setError,
    setOpen,
  } = useForm({
    ...obj,
  });
  const [register] = useMutation(REGISTER_USER);
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const {
        data: {
          register: { email, _id },
        },
      } = await register({ variables: { ...formData } });
      await verifyEmail({ variables: { _id } });
      history.push({ pathname: TO_UNVERIFIED_EMAIL, state: { email, _id } });
    } catch (error) {
      if (
        error.message ===
        ("Email has been registered" || "User could not be created")
      ) {
        setError(error.message);
        setOpen(true);
        setSubmitted(false);
      } else {
        setError("An unexpected error occurred");
        setOpen(true);
        setSubmitted(false);
      }
    }
  };

  return (
    <Paper className={classes.paper} square>
      <Grid
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        container
      >
        <Grid xs={10} sm={8} md={5} lg={4} item>
          {renderError()}
          <div className={classes.heading}>
            <Avatar src={BUSINESS_LOGO} className={classes.logo} />
            <Typography variant="h5">Sign Up</Typography>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
            {renderInput("firstname", "Firstname", validateName, "John")}
            {renderInput("lastname", "Lastname", validateName, "Doe")}
            {renderInput("email", "Email", validateEmail, "johndoe@gmail.com")}
            {renderInput(
              "password",
              "Password",
              validatePassword,
              null,
              "password"
            )}
            {renderButton("SIGN UP")}
          </form>
          <div className={classes.heading}>
            <Typography variant="body1">
              Already have an account?
              <Link to={TO_LOGIN} className={classes.link}>
                Login
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Signup;
