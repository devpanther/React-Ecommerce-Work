import { useMutation } from "@apollo/client";
import { Button, Collapse, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ADD_PAYMENT, GET_SECRET } from "../mutations/payment";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useForm from "../hooks/useForm";
import { useStyles } from "../styles/form";
import { TO_CREDIT_CARDS } from "../utils/constants";
import { validateWithMessage } from "../utils/validation";
import CardModal from "../components/CardModal";
import { Alert } from "@material-ui/lab";
import { ShowChartRounded } from "@material-ui/icons";

const CardForm = ({ history, location: { state } }) => {
  const [addPayment] = useMutation(ADD_PAYMENT);
  const [getSecret] = useMutation(GET_SECRET);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const {
    renderInput,
    renderButton,
    renderCardElement,
    renderError,
    formData,
    setSubmitted,
    setError,
  } = useForm({
    number: "",
    cardName: "",
    date: "",
    cvc: "",
  });
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const element = elements.getElement(CardNumberElement);
    try {
      const { data: result } = await getSecret();
      const { setupIntent, error } = await stripe.confirmCardSetup(
        result.getSecret,
        {
          payment_method: {
            card: element,
            billing_details: {
              name: formData.cardName,
              email: "ekeneonyekaba@gmail.com",
            },
          },
        }
      );
      if (error) {
        setError(error.message);
        return;
      }
      await addPayment({ variables: { cardId: setupIntent.payment_method } });
      state ? history.push(state) : history.push(TO_CREDIT_CARDS);
    } catch (err) {
      setSubmitted(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Paper square>
        <Grid justify="center" style={{ minHeight: "95vh" }} container>
          <Grid xs={10} sm={7} md={5} lg={4} item>
            <br />
            <center>
              <Collapse in={show}>
                <Alert
                  severity="info"
                  style={{ marginBottom: "1rem", width: "fit-content" }}
                  onClose={() => setShow(false)}
                >
                  Click the button below to use view test cards{" "}
                  <strong>
                    Note: This is in test mode. Your card no will not work
                  </strong>
                </Alert>
              </Collapse>
            </center>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <Typography variant="h5">Add a Payment Method</Typography>
              <Button
                onClick={() => setOpen(true)}
                style={{ padding: "0.7rem" }}
                className={classes.submit}
                variant="contained"
              >
                VIEW TEST CARDS
              </Button>
            </div>
            <CardModal open={open} setOpen={setOpen} />
            {renderError()}
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <Typography
                className={classes.subHeader}
                variant="body1"
                color="textSecondary"
              >
                PAYMENT DETAILS
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {renderInput(
                    "cardName",
                    "Cardholder Name",
                    validateWithMessage("Please enter a valid cardholder name")
                  )}
                </Grid>
                <Grid item xs={12}>
                  {renderCardElement()}
                </Grid>
                <Grid item xs={6}>
                  {renderCardElement("date")}
                </Grid>
                <Grid item xs={6}>
                  {renderCardElement("cvc")}
                </Grid>
                <Grid item xs={4} md={6}></Grid>
                <Grid item xs={4} md={3}>
                  <Button
                    onClick={() =>
                      history.push(state ? state : TO_CREDIT_CARDS)
                    }
                    className={classes.outlinedBtn}
                    fullWidth
                    color="primary"
                    variant="outlined"
                  >
                    CANCEL
                  </Button>
                </Grid>
                <Grid item xs={4} md={3}>
                  {renderButton("SAVE")}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CardForm;
