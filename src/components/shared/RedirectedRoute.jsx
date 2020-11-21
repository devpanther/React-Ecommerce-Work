import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { TO_HOME } from "../../utils/constants";

const RedirectedRoute = ({ component: C, AppProps, ...rest }) => {
  const user = getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={TO_HOME} /> : <C {...props} {...AppProps} />
      }
    />
  );
};

export default RedirectedRoute;
