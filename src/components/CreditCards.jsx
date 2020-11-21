import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Collapse, Grid, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStyles } from "../styles/creditCards";
import { TO_CREDIT_CARDS } from "../utils/constants";
import Loading from "./shared/Loading";
import PaymentCard from "./shared/PaymentCard";
import { CardContext } from "../context/card";

const CreditCards = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const { refetchCards, handleDelete, cards, error, loading } = useContext(
    CardContext
  );

  useEffect(() => {
    refetchCards();
  }, []);

  if (loading) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      <br />
      <Grid justify="center" container>
        <Grid xs={10} sm={7} md={5} lg={4} item>
          {error && (
            <center>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  style={{ marginBottom: "2rem" }}
                  onClose={() => setOpen(false)}
                >
                  {error.message}
                </Alert>
              </Collapse>
            </center>
          )}
          <center>
            <Typography style={{ marginBottom: "2rem" }} variant="h5">
              My Payment Cards
            </Typography>
          </center>
          <Button
            className={classes.btn}
            fullWidth
            onClick={() => history.push(TO_CREDIT_CARDS + "/new")}
            variant="contained"
          >
            ADD A PAYMENT METHOD
          </Button>
          {!cards.length && (
            <center>
              <Typography variant="body1">
                You have no payment method. Click the button below to add one.
              </Typography>
            </center>
          )}
        </Grid>
      </Grid>

      <Grid justify="center" spacing={2} container>
        {cards.map((payment) => (
          <Grid key={payment._id} item xs="auto">
            <PaymentCard payment={payment} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <br />
    </Paper>
  );
};

export default CreditCards;
