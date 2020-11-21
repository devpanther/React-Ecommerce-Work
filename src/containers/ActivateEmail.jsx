import { useMutation } from "@apollo/client";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { ACTIVATE_EMAIL, VERIFY_EMAIL } from "../mutations/user";
import { useStyles } from "../styles/form";
import { CELEBRATE_EMOJI, SAD_EMOJI, TO_LOGIN } from "../utils/constants";
import { validateEmail } from "../utils/validation";

const ActivateEmail = ({ match, history }) => {
  const classes = useStyles();
  const {
    renderSuccess,
    renderError,
    renderInput,
    renderButton,
    setError,
    setSuccess,
    setSubmitted,
    setOpen,
    formData,
    error,
  } = useForm({ email: "" });
  const [activateEmail] = useMutation(ACTIVATE_EMAIL);
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  const handleSubmit = async (e) => {
    setSubmitted(true);
    try {
      e.preventDefault();
      await verifyEmail({ variables: { email: formData.email } });
      setSuccess("Verification email was sent successfully");
      setOpen(true);
    } catch (ex) {
      setError(ex.message);
      setOpen(true);
    }
    setSubmitted(false);
  };

  useEffect(() => {
    activateEmail({ variables: { token: match.params.token } })
      .then(() => setSuccess("Your email is now verified"))
      .catch((err) => {
        setError(err.message);
      });
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
          {renderSuccess()}
          <div className={classes.heading}>
            <Avatar
              src={error ? SAD_EMOJI : CELEBRATE_EMOJI}
              className={classes.logo}
              variant="rounded"
            />
          </div>
          {error ? (
            <Typography variant="subtitle1" className={classes.centeredText}>
              Oops it looks like something has gone wrong. Either the token has
              expired or is invalid. Please try resending the verification email
            </Typography>
          ) : (
            <Typography variant="subtitle1" className={classes.centeredText}>
              Congratulations you have activated your account now. You can login
              in now and order on Fast Food.
            </Typography>
          )}
          {!error ? (
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              onClick={() => history.push(TO_LOGIN)}
            >
              Go To The Login Page
            </Button>
          ) : (
            <>
              <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
                {renderInput("email", "Email", validateEmail)}
                {renderButton("Resend Verification Email")}
              </form>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActivateEmail;
