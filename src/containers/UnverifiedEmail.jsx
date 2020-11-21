import { useMutation } from "@apollo/client";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { VERIFY_EMAIL } from "../mutations/user";
import { BUSINESS_LOGO, TO_SIGNUP } from "../utils/constants";
import { useStyles } from "../styles/form";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";

const UnverifiedEmail = ({ location }) => {
  const classes = useStyles();
  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const { setError, setSuccess, setOpen, renderError, renderSuccess } = useForm(
    ""
  );

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await verifyEmail({ variables: { _id: location.state._id } });
      setSuccess("Verification email was sent successfully");
      setOpen(true);
    } catch (error) {
      setError("An error occured please try again");
      setOpen(true);
    }
  };

  if (!location.state) return <Redirect to={TO_SIGNUP} />;
  return (
    <Paper className={classes.paper} square>
      <Grid
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        container
      >
        <Grid xs={10} sm={8} md={5} lg={4} item>
          {renderSuccess()}
          {renderError()}
          <div className={classes.heading}>
            <Avatar src={BUSINESS_LOGO} className={classes.logo} />
          </div>
          <Typography variant="h5" className={classes.centeredText}>
            <strong>Please verify your email address</strong>
          </Typography>
          <Typography variant="subtitle1" className={classes.centeredText}>
            Before you can order on Fast Food, we need you to verify your email
            address.
          </Typography>
          <Typography variant="subtitle1" className={classes.centeredText}>
            An email containing verification instructions was sent to
            <strong> {location.state.email}.</strong> If you have not received a
            mail check your spam settings or check the spelling of your email
            address.
          </Typography>
          <Button
            fullWidth
            className={classes.submit}
            onClick={(e) => handleClick(e)}
            variant="contained"
          >
            Resend Verification Email
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UnverifiedEmail;
