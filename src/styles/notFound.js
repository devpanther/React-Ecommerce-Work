import { makeStyles } from "@material-ui/core";
import { common, orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  button: {
    color: common.white,
    backgroundColor: orange[600],
    marginTop: "2rem",
  },
  image: {
    width: "6rem",
    height: "6rem",
    marginBottom: "0.5rem",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  subTitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
}));
