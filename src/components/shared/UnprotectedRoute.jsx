import React from "react";
import { Route } from "react-router-dom";

const UnprotectedRoute = ({ component: C, AppProps, ...rest }) => {
  return <Route {...rest} render={(props) => <C {...props} {...AppProps} />} />;
};

export default UnprotectedRoute;
