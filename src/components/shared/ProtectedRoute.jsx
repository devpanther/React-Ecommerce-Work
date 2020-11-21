import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { TO_LOGIN } from "../../utils/constants";

const ProtectedRoute = ({ component: C, AppProps, ...rest }) => {
  const user = getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect
            to={{
              pathname: TO_LOGIN,
              state: props.location.pathname,
              search: `?redirect_to=${encodeURIComponent(
                props.location.pathname
              )}`,
            }}
          />
        ) : (
          <C {...props} {...AppProps} />
        )
      }
    />
  );
};

export default ProtectedRoute;
