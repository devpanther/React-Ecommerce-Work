import { makeStyles } from "@material-ui/core";
import { common, orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  content: {
    margin: "0.5rem 0",
    fontSize: "1.1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  btn: {
    display: "block",
    padding: "0.7rem 1rem",
    margin: "0 auto 2rem auto",
    backgroundColor: orange[600],
    color: common.white,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  icon: {
    fontSize: "5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
  modalTitle: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  paper: {
    background: theme.palette.background.default,
    minHeight: "98vh",
  },
  subHeader: {
    marginBottom: "1rem",
  },
}));
