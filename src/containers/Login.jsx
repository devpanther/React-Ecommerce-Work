import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "../styles/form";
import { BUSINESS_LOGO, TO_HOME, TO_SIGNUP } from "../utils/constants";
import useForm from "../hooks/useForm";
import { LOGIN_USER } from "../mutations/user";

const Login = ({ location: { state } }) => {
  const classes = useStyles();
  const {
    renderInput,
    renderButton,
    renderError,
    formData,
    setSubmitted,
    setError,
    setOpen,
  } = useForm({});
  const [login] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await login({ variables: { email: "", password: "", ...formData } });
      window.location = state ? state : TO_HOME;
    } catch (e) {
      setSubmitted(false);
      setError(e.message);
      setOpen(true);
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
            <Typography variant="h5">Login</Typography>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
            {renderInput("email", "Email", null, "johndoe@gmail.com")}
            {renderInput("password", "Password", null, null, "password")}
            {renderButton("LOGIN")}
          </form>
          <div className={classes.heading}>
            <Typography variant="body1">
              Don't have an account?
              <Link to={TO_SIGNUP} className={classes.link}>
                Sign Up
              </Link>
            </Typography>
          </div>
          <div className={classes.heading} style={{ marginTop: "1rem" }}>
            <Typography variant="body1">
              Forgot Password?
              <Link to={"/password-reset"} className={classes.link}>
                Reset Here
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
