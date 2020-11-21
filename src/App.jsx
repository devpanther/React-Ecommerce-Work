import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Routes from "./routes";
import { orange } from "@material-ui/core/colors";

const getHourOfTheDay = () => {
  if (new Date().getHours() >= 18) {
    return true;
  }
  return false;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => getHourOfTheDay());
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: orange,
    },
  });

  useEffect(() => {
    document.body.style.setProperty(
      "--border-color",
      theme.palette.action.disabled
    );
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />{" "}
      <NavBar onClick={() => setDarkMode(!darkMode)} darkMode={darkMode} />{" "}
      <Routes />
    </ThemeProvider>
  );
};

export default App;
