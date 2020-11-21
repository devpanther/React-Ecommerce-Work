import { makeStyles } from "@material-ui/core";
import { grey, orange, red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  centerGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  content: {
    margin: "1rem 0",
  },
  deleteIcon: {
    fontSize: "1.7rem",
    color: red[700],
  },
  editIcon: {
    color: orange[600],
    fontSize: "1.7rem",
  },
  image: {
    height: "7rem",
  },
  subHeader: {
    marginLeft: "0.5rem",
    textTransform: "capitalize",
  },
  spacedText: {
    marginBottom: "0.5rem",
  },
  userIcon: {
    fontSize: "2.2rem",
    color: grey[500],
  },
}));
