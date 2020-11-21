import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Radio,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "../../styles/paymentCard";
import { TO_ADDRESSES } from "../../utils/constants";

const AddressCard = ({
  address,
  onDelete,
  onSelect,
  enableRadioBtn,
  enableEditBtn,
  selectedValue,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card}>
      {enableRadioBtn && (
        <Radio
          name="address"
          color="primary"
          value={address._id}
          checked={selectedValue === address._id}
          onChange={onSelect}
        />
      )}
      <CardActionArea>
        <CardContent>
          <Typography
            style={{ marginBottom: "1rem" }}
            variant="body1"
            color="textSecondary"
          >
            SHIPPING ADDRESS
          </Typography>
          <Typography
            style={{ fontWeight: "bold" }}
            className={classes.content}
          >
            {address.name}
          </Typography>
          <Typography className={classes.content}>
            {address.address} {address.postalCode}
          </Typography>
          <Typography className={classes.content}>
            {address.city}, {address.state}
          </Typography>
          <Typography className={classes.content}>{address.country}</Typography>
        </CardContent>
      </CardActionArea>
      {enableEditBtn && (
        <CardActions>
          <Grid container alignItems="center">
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
              <IconButton
                onClick={() => history.push(`${TO_ADDRESSES}/${address._id}`)}
                color="primary"
              >
                <Edit className={classes.icon} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={(e) => onDelete(e, address._id)}>
                <Delete className={classes.deleteIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

AddressCard.defaultProps = {
  enableRadioBtn: false,
  enableEditBtn: false,
};

export default AddressCard;
