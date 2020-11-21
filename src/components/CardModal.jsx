import React from "react";
import {
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { useStyles } from "../styles/creditCards";
import { cardOptions } from "../utils/cardOptions";

const CardModal = ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogContent>
        <center>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography className={classes.modalTitle} variant="h5">
              Test Card Numbers
            </Typography>
            <IconButton
              style={{ marginLeft: "auto" }}
              className={classes.closeButton}
              color="primary"
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </div>
        </center>
        <center>
          <Typography style={{ width: "80%" }} variant="body1">
            These are the list of test card number for you to use in order to
            save card. Your card will not work for this
          </Typography>
        </center>
        <center>
          <List style={{ width: "70%" }}>
            {cardOptions.map((option) => (
              <ListItem key={option.value}>
                <ListItemAvatar>
                  <Avatar src={option.logo} variant="square" />
                </ListItemAvatar>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </center>
      </DialogContent>
      {/* <DialogActions>
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
                      </Grid>
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>
      </DialogActions> */}
    </Dialog>
  );
};

export default CardModal;
