import { makeStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

export const useStyles = makeStyles({
  paper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: orange[600],
    marginTop: "1rem",
    textAlign: "center",
  },
  spinner: {
    color: orange[600],
  },
});
