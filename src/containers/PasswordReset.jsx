import { useMutation } from "@apollo/client";
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { RESET_PASSWORD, RESET_TOKEN } from "../mutations/user";
import useForm from "../hooks/useForm";
import { useStyles } from "../styles/form";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import { BUSINESS_LOGO } from "../utils/constants";

const PasswordReset = ({ match: { params }, history, location }) => {
  const classes = useStyles();
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [sendResetToken] = useMutation(RESET_TOKEN);
  const {
    renderInput,
    renderButton,
    renderError,
    setError,
    setOpen,
    formData,
    error,
    setFormData,
    setFormErrors,
    setSubmitted,
  } = useForm({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      if (params.token && !error) {
        await resetPassword({
          variables: { token: params.token, password: formData.password },
        });
        toast.success("Your password has been changed successfully");
        await setFormErrors({ password: "", password2: "" });
        await setFormData({ password: "", password2: "" });
        return;
      }
      await sendResetToken({ variables: { ...formData } });
      await setError("");
      await setFormErrors({ email: "" });
      await setFormData({ email: "" });
      return history.push({
        pathname: "/password-reset",
        state: {
          success:
            "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder",
        },
      });
    } catch (e) {
      setSubmitted(false);
      setError(e.message);
      setOpen(true);
      setFormErrors({ email: "" });
      setFormData({ email: "" });
    }
  };

  const onMount = useCallback(async () => {
    if (params.token) {
      try {
        await resetPassword({ variables: { token: params.token } });
        await setFormErrors({ password: "", password2: "" });
        await setFormData({ password: "", password2: "" });
      } catch (err) {
        await setFormErrors({ email: "" });
        await setFormData({ email: "" });
        await setError(err.message);
      }
    }
  }, [params.token]);

  useEffect(() => {
    onMount();
    window.scrollTo(0, 0);
  }, []);
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
          {location.state && (
            <Alert severity="success" style={{ marginBottom: "1rem" }}>
              {location.state.success}
            </Alert>
          )}
          <div className={classes.heading}>
            <Avatar src={BUSINESS_LOGO} className={classes.logo} />
            <Typography variant="h5">
              {params.token && !error ? "Change Password" : "Password Reset"}
            </Typography>
          </div>
          {params.token && !error ? (
            <Typography variant="subtitle1" className={classes.centeredText}>
              Enter your new password to change your password
            </Typography>
          ) : (
            <Typography variant="subtitle1" className={classes.centeredText}>
              Enter the email address associated with your Fast Food account and
              we send you a password reset link.
            </Typography>
          )}
          {params.token && !error ? (
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
              {renderInput(
                "password",
                "Password",
                validatePassword,
                null,
                "password"
              )}
              {renderInput(
                "password2",
                "Confirm Password",
                validateConfirmPassword(formData.password),
                null,
                "password"
              )}
              {renderButton("Change Password")}
            </form>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
              {renderInput("email", "Email", validateEmail)}
              {renderButton("Send Password Reset Email")}
            </form>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PasswordReset;
