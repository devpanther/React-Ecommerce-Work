import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
  },
  gridContainer: {
    flexWrap: "nowrap",
    overflow: "auto",
  },
  media: {
    height: "10rem",
  },
}));
