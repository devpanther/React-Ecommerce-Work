import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  brandIcon: {
    width: "6rem",
    height: "4rem",
  },
  card: {
    width: "25rem",
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
  content: {
    margin: "0.5rem 0",
  },
  deleteIcon: {
    fontSize: "1.7rem",
    color: red[700],
  },
  icon: {
    fontSize: "1.7rem",
  },
  subHeader: {
    margin: "1rem 0",
  },
}));
