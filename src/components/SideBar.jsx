import React, { useContext } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { ListItem, ListItemAvatar, Avatar, List } from "@material-ui/core";
import { Divider, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExitToApp, FavoriteBorder, LocationOn } from "@material-ui/icons";
import { AccountCircle, ShoppingCart, CreditCard } from "@material-ui/icons";
import { PersonAdd, Person, Receipt, Home } from "@material-ui/icons";

import { TO_LOGOUT, TO_ORDERS, TO_SIGNUP } from "../utils/constants";
import { TO_CREDIT_CARDS, TO_FAVOURITES, TO_HOME } from "../utils/constants";
import { TO_ADDRESSES, TO_LOGIN, TO_CARTS } from "../utils/constants";
import { useStyles } from "../styles/navbar";
import { UserContext } from "../context/user";
import { data } from "../utils/data";

const SideBar = ({ open, setOpen, onClick }) => {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { user } = useContext(UserContext);

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <List className={classes.list}>
        <ListItem className={classes.user}>
          <AccountCircle className={classes.userIcon} />
          <ListItemText
            className={classes.username}
            primary={
              user ? `Welcome ${user.firstname.toLowerCase()}` : "Hello Guest"
            }
          />
        </ListItem>
        <Divider />
        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_HOME)}
          button
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        {user ? (
          <div>
            <ListItem
              className={classes.listItem}
              onClick={() => onClick(TO_LOGOUT)}
              button
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </div>
        ) : (
          <div>
            <ListItem
              className={classes.listItem}
              onClick={() => onClick(TO_SIGNUP)}
              button
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary={"Sign Up"} />
            </ListItem>
            <ListItem
              className={classes.listItem}
              onClick={() => onClick(TO_LOGIN)}
              button
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </div>
        )}
        <Divider />
        <ListItem className={classes.subList}>
          <ListItemText primary={"MY FAST FOOD ACCOUNT"} />
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_ADDRESSES)}
          button
        >
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={"Addresses"} />
        </ListItem>

        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_CREDIT_CARDS)}
          button
        >
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText primary={"Credit Cards"} />
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_FAVOURITES)}
          button
        >
          <ListItemIcon>
            <FavoriteBorder />
          </ListItemIcon>
          <ListItemText primary={"Favourites"} />
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_CARTS)}
          button
        >
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={"Shopping Cart"} />
        </ListItem>
        <ListItem
          className={classes.listItem}
          onClick={() => onClick(TO_ORDERS)}
          button
        >
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary={"Orders"} />
        </ListItem>
        <Divider />
        <ListItem className={classes.subList}>
          <ListItemText primary={"OUR CATEGORIES"} />
        </ListItem>
        {data.map((item) => (
          <ListItem
            className={classes.listItem}
            button
            key={item.name}
            onClick={() => onClick(item.path)}
          >
            <ListItemAvatar>
              <Avatar src={item.image} alt={item.name} />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default SideBar;
