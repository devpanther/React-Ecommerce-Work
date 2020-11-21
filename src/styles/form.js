import { makeStyles, TextField, withStyles } from "@material-ui/core";
import { common, orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  centeredText: { textAlign: "center", marginBottom: "1rem" },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "column",
    margin: "2rem 0",
  },
  gridContainer: {
    flexWrap: "nowrap",
    overflow: "auto",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  input: {
    marginBottom: "1.2rem",
  },
  link: {
    color: orange[600],
    marginLeft: "1rem",
    textDecoration: "none",
  },
  logo: {
    width: "6rem",
    height: "6rem",
    marginRight: "0.6rem",
  },
  outlinedBtn: {
    margin: "0.5rem 0px",
    padding: "0.7rem 0",
    borderColor: orange[600],
    border: "1px solid",
    textTransform: "uppercase",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  submit: {
    margin: "0.5rem 0px",
    padding: "0.7rem 0",
    color: common.white,
    backgroundColor: orange[600],
    textTransform: "uppercase",
  },
  subHeader: {
    marginBottom: "0.7rem",
  },
}));

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: orange[600],
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: orange[600],
      },
      "&:hover fieldset": {
        borderColor: orange[600],
      },
    },
  },
})(TextField);
