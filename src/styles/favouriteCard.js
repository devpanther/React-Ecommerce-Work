import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  content: {
    margin: "1rem 0",
  },
  deleteIcon: {
    fontSize: "1.7rem",
    color: red[700],
  },
  icon: {
    fontSize: "1.7rem",
  },
  image: {
    height: "7rem",
  },
}));
