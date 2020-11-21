import { useQuery } from "@apollo/client";
import { Collapse, Grid, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import OrderTable from "../components/OrderTable";
import Loading from "../components/shared/Loading";
import { ORDERS } from "../queries/order";
import { useStyles } from "../styles/paper";

const Orders = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { data, loading, error, refetch } = useQuery(ORDERS);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <Loading />;
  return (
    <Paper className={classes.paper} square>
      {error && (
        <center>
          <Collapse in={open}>
            <Alert
              severity="error"
              style={{ margin: "1rem 0", width: "fit-content" }}
              onClose={() => setOpen(false)}
            >
              {error.message}
            </Alert>
          </Collapse>
        </center>
      )}
      <Grid justify="center" container>
        {data && (
          <Grid xs={11} item>
            <OrderTable data={data.orders} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Orders;
