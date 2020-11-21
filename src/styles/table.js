import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  cell: {
    textTransform: "capitalize",
  },
  columnHead: {
    cursor: "pointer",
  },
  errorCell: {
    textTransform: "capitalize",
    color: green[600],
    fontWeight: "bold",
  },
  successCell: {
    textTransform: "capitalize",
    color: green[600],
    fontWeight: "bold",
  },
  table: {
    minWidth: "770px",
  },
  title: {
    margin: "1rem 0",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  wrapper: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "auto",
  },
}));
