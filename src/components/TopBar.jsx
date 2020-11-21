import React, { useContext, useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Avatar, Badge, InputBase, Hidden } from "@material-ui/core";
import { AppBar, Divider, Toolbar, IconButton } from "@material-ui/core";
import {
  AccountCircle,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Brightness4,
  Brightness7,
} from "@material-ui/icons";
import { useStyles } from "../styles/navbar";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { BUSINESS_LOGO, TO_LOGOUT, TO_SIGNUP } from "../utils/constants";
import { TO_CARTS, TO_HOME, TO_LOGIN } from "../utils/constants";

const TopBar = ({ setOpen, onClick, darkMode }) => {
  const classes = useStyles();
  const history = useHistory();
  const { carts } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    setQuery("");
    return history.push(`/recipes?search=${query}`);
  };

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          onClick={() => setOpen(true)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon className={classes.menu} />
        </IconButton>
        <Avatar
          className={classes.logo}
          onClick={() => history.push(TO_HOME)}
          variant="rounded"
          src={BUSINESS_LOGO}
          alt={"Logo"}
        />
        <Hidden xsDown>
          <InputBase
            placeholder="Search Foods"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ "aria-label": "Search Foods" }}
            className={classes.input}
            style={{ color: "#fff !important" }}
            endAdornment={
              <IconButton
                className={classes.search}
                disabled={query ? false : true}
                onClick={handleSubmit}
              >
                <SearchIcon className={classes.icon} />
              </IconButton>
            }
          />
        </Hidden>
        <IconButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className={classes.dropdown}
        >
          <AccountCircle className={classes.icon} />
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          keepMounted
          id="user-menu"
          onClose={() => setAnchorEl(null)}
        >
          {!user ? (
            <div>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push(TO_LOGIN);
                }}
              >
                <Button color="primary">Login</Button>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push(TO_SIGNUP);
                }}
              >
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>
              </MenuItem>
            </div>
          ) : (
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                history.push(TO_LOGOUT);
              }}
            >
              <Button color="primary">Logout</Button>
            </MenuItem>
          )}
        </Menu>
        <IconButton className={classes.switch} onClick={onClick}>
          {darkMode ? (
            <Brightness7 className={classes.icon} />
          ) : (
            <Brightness4 className={classes.icon} />
          )}
        </IconButton>
        <IconButton
          onClick={() => history.push(TO_CARTS)}
          className={classes.cart}
        >
          <Badge showZero badgeContent={carts.length} className={classes.badge}>
            <ShoppingCart className={classes.icon} />
          </Badge>
        </IconButton>
      </Toolbar>
      <Hidden smUp>
        <InputBase
          placeholder="Search Foods"
          inputProps={{ "aria-label": "Search Foods" }}
          className={classes.mobileInput}
          style={{ color: "#fff !important" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          endAdornment={
            <IconButton
              disabled={query ? false : true}
              onClick={handleSubmit}
              className={classes.search}
            >
              <SearchIcon className={classes.icon} />
            </IconButton>
          }
        />
      </Hidden>
    </AppBar>
  );
};

export default TopBar;
