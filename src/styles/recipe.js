import { makeStyles } from "@material-ui/core";
import { common, orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  bar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    marginBottom: "0.7rem",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
  },
  cartNo: {
    borderRadius: "4px",
    padding: "0.5rem 0.8rem",
    background: orange[600],
    color: common.white,
    [theme.breakpoints.down("xs")]: {
      padding: "0.3rem 0.5rem",
      fontSize: "0.9rem",
    },
  },
  cart: {
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
  checkedIcon: {
    color: theme.palette.primary.main,
    marginRight: "0.5rem",
  },
  commentButton: {
    background: orange[600],
    color: common.white,
    padding: "0.6rem",
    width: "fit-content",
    marginRight: "0.5rem",
  },
  content: {
    marginBottom: "0.7rem",
    backgroundColor: theme.palette.background.paper,
  },
  diet: {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    margin: "0.5rem 0 0 0.5rem",
  },
  gridItem: {
    paddingBottom: "0.5rem",
  },
  gridText: {
    margin: "0.5rem 0 0 0.5rem",
  },
  heartFull: {
    color: "#e31b23",
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
    margin: "0.5rem 0",
  },
  image: {
    display: "block",
    margin: "1rem auto 2rem auto",
    width: "100%",
    height: "35rem",
    [theme.breakpoints.down("md")]: {
      height: "30rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "25rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
    },
  },
  name: {
    overflowWrap: "break-word",
    marginTop: "2rem",
    textAlign: "center",
  },
  paper: {
    minHeight: "94vh",
    backgroundColor: theme.palette.background.default,
  },
  price: {
    fontWeight: "bold",
    color: orange[600],
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  rating: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  subHeader: {
    marginBottom: "0.7rem",
    [theme.breakpoints.down("xs")]: {
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  toggleButton: {
    borderRadius: "5px",
    padding: "0.6rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0.4rem",
      fontSize: "0.9rem",
    },
  },
}));
