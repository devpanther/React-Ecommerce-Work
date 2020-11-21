import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    minHeight: "95vh",
    padding: "2rem",
  },
  pagination: {
    width: "fit-content",
    margin: "2rem auto",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
}));
