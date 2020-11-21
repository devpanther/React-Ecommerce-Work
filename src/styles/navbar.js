import { makeStyles } from "@material-ui/core";
import { orange, common } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : orange[600],
    display: "flex",
    flexDirection: "column",
  },
  badge: {
    color: common["white"],
  },
  cart: {
    marginLeft: "1.5rem",
  },
  dropdown: {
    marginLeft: "auto",
  },
  icon: {
    fontSize: "1.7rem",
    color: common["white"],
  },
  input: {
    borderRadius: "6px",
    background:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : "#ffa500",
    color: "#fff !important",
    paddingLeft: "15px",
    marginLeft: "6rem",
  },
  mobileInput: {
    borderRadius: "6px",
    background:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : "#ffa500",
    color: "#fff !important",
    paddingLeft: "15px",
    width: "85%",
    margin: "0.5rem auto",
  },
  menu: {
    color: common.white,
  },
  subList: {
    marginBottom: "10px",
    color: orange[600],
  },
  list: {
    padding: "0px",
  },
  listItem: {
    padding: "10px 30px",
  },
  logo: {
    marginLeft: "1rem",
    cursor: "pointer",
  },
  search: {
    background: "transparent !important",
  },
  switch: {
    marginLeft: "1.5rem",
  },
  toolbar: {
    display: "flex",
  },
  user: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : orange[600],
    padding: "20px 10px",
  },
  userIcon: {
    fontSize: "2rem",
    color: common["white"],
  },
  username: {
    marginLeft: "10px",
    textTransform: "capitalize",
    color: common["white"],
  },
}));
