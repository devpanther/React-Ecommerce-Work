import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    minHeight: "800px",
    padding: "2rem",
  },
  media: {
    height: "20rem",
    [theme.breakpoints.down("sm")]: {
      height: "17rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
    },
  },
  card: {
    margin: "auto",
    width: "95%",
  },
  cardHeader: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}));
