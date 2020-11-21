import React, { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button, Collapse, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { toast } from "react-toastify";

import Loading from "../components/shared/Loading";
import PaymentCard from "../components/shared/PaymentCard";
import SuccessModal from "../components/SuccessModal";
import { CardContext } from "../context/card";
import { CartContext } from "../context/cart";
import useForm from "../hooks/useForm";
import { TAKE_ORDER } from "../mutations/order";
import { useStyles } from "../styles/creditCards";
import {
  TO_CARTS,
  TO_CREDIT_CARDS,
  TO_SELECT_ADDRESS,
} from "../utils/constants";
import { calculateTotalPrice } from "../utils/helpers";

const CheckOut = ({ history, location }) => {
  const classes = useStyles();
  const {
    refetchCart,
    refetchRecipe,
    recipes,
    cartObj,
    isLoading,
  } = useContext(CartContext);
  const { cards, refetchCards, error, loading } = useContext(CardContext);
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const { renderButton, setSubmitted } = useForm({});
  const price = calculateTotalPrice(recipes, cartObj);

  const [takeOrder] = useMutation(TAKE_ORDER);

  const handleSelect = (e) => {
    setPaymentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await takeOrder({
        variables: { paymentId: paymentId, addressId: location.state },
      });
      setShow(true);
      refetchCart();
      refetchRecipe();
    } catch (error) {
      setSubmitted(false);
      toast.error("Could not process payment. Please try again");
    }
  };

  useEffect(() => {
    if (!recipes.length) return history.replace(TO_CARTS);

    if (!location.state) return history.replace(TO_SELECT_ADDRESS);

    refetchCards();
    refetchCart();
    window.scrollTo(0, 0);
  }, []);

  if (loading || isLoading) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      <SuccessModal cardId={paymentId} addressId={location.state} open={show} />
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
              {!cards.length
                ? "Create a payment method before placing your order"
                : "Select a payment method"}
            </Typography>
          </center>
          {!cards.length && (
            <center>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  history.push(TO_CREDIT_CARDS + "/new", location.pathname)
                }
                className={classes.btn}
              >
                ADD A NEW PAYMENT METHOD
              </Button>
            </center>
          )}
          {paymentId && (
            <form
              style={{ width: "90%", marginBottom: "1rem" }}
              onSubmit={handleSubmit}
            >
              {renderButton(`PAY $${price} `)}
            </form>
          )}
        </Grid>
      </Grid>
      <Grid spacing={2} alignItems="center" justify="center" container>
        {cards.map((payment) => (
          <Grid key={payment._id} xs={"auto"} item>
            <PaymentCard
              payment={payment}
              enableRadioBtn
              enableDeleteBtn={false}
              selectedValue={paymentId}
              onSelect={handleSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CheckOut;
