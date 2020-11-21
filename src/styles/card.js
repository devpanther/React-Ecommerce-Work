import { common, orange } from "@material-ui/core/colors";

const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
  button: {
    color: common.white,
    background: orange[600],
  },
  card: {
    width: "22rem",
    [theme.breakpoints.down("xs")]: {
      width: "18rem",
    },
  },
  cardHeader: {
    height: "9rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      height: "6rem !important",
    },
  },
  centerGroup: {
    display: "flex",
    alignItems: "center",
  },
  heartFull: {
    color: "#e31b23",
  },
  media: {
    height: "11rem",
    [theme.breakpoints.down("xs")]: {
      height: "9rem",
    },
  },
  stretchCard: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "auto",
    },
  },
}));
