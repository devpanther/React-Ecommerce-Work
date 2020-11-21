import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Radio,
  Grid,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

import { useStyles } from "../../styles/paymentCard";
import { MASTERCARD_LOGO, VISA_LOGO } from "../../utils/constants";

const PaymentCard = ({
  payment,
  onDelete,
  onSelect,
  enableRadioBtn,
  enableDeleteBtn,
  selectedValue,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {enableRadioBtn && (
        <Radio
          name="payment-method"
          color="primary"
          value={payment._id}
          checked={selectedValue === payment._id}
          onChange={onSelect}
        />
      )}
      {enableDeleteBtn && (
        <CardActions>
          <Typography variant="body1" color="textPrimary">
            PAYMENT METHOD
          </Typography>
          <IconButton onClick={(e) => onDelete(e, payment._id)}>
            <Delete className={classes.deleteIcon} />
          </IconButton>
        </CardActions>
      )}
      <CardActionArea>
        <CardContent>
          <Typography
            style={{ marginBottom: "1rem" }}
            variant="body1"
            color="textSecondary"
          >
            CARD INFORMATION
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Avatar
                src={payment.brand === "visa" ? VISA_LOGO : MASTERCARD_LOGO}
                variant="square"
                className={classes.brandIcon}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.content}>
                {payment.name}
              </Typography>
              <Typography className={classes.content}>
                **** **** **** {payment.last4}
              </Typography>
              <Typography className={classes.content}>
                Expires {payment.exp_month}/{payment.exp_year}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

PaymentCard.defaultProps = {
  enableRadioBtn: false,
  enableDeleteBtn: true,
};

export default PaymentCard;
