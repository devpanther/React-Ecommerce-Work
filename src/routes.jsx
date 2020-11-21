import React from "react";
import { Switch, Route } from "react-router-dom";
import UnprotectedRoute from "./components/shared/UnprotectedRoute";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import RedirectedRoute from "./components/shared/RedirectedRoute";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import PasswordReset from "./containers/PasswordReset";
import UnverifiedEmail from "./containers/UnverifiedEmail";
import ActivateEmail from "./containers/ActivateEmail";
import {
  TO_ADDRESSES,
  TO_CARTS,
  TO_CHECKOUT,
  TO_CREDIT_CARDS,
  TO_FAVOURITES,
  TO_HOME,
  TO_LOGIN,
  TO_LOGOUT,
  TO_ORDERS,
  TO_PASSWORD_RESET,
  TO_RECIPES,
  TO_SELECT_ADDRESS,
  TO_SIGNUP,
  TO_UNVERIFIED_EMAIL,
  TO_VERIFIED_EMAIL,
} from "./utils/constants";
import Logout from "./containers/Logout";
import Recipes from "./containers/Recipes";
import RecipeDetails from "./containers/RecipeDetails";
import Favourites from "./containers/Favourites";
import Carts from "./containers/Carts";
import NotFound from "./components/shared/NotFound";
import CreditCards from "./components/CreditCards";
import CreateAddress from "./containers/CreateAddress";
import Addresses from "./containers/Addresses";
import UpdateAddress from "./containers/UpdateAddress";
import CardForm from "./containers/CardForm";
import CheckOut from "./containers/CheckOut";
import Orders from "./containers/Orders";
import SelectAddress from "./containers/SelectAddress";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={TO_LOGOUT} component={Logout} />
      <UnprotectedRoute exact path={TO_HOME} component={Home} />
      <UnprotectedRoute
        exact
        path={TO_RECIPES + "/:_id"}
        component={RecipeDetails}
      />
      <UnprotectedRoute exact={false} path={TO_RECIPES} component={Recipes} />
      <RedirectedRoute exact path={TO_SIGNUP} component={Signup} />
      <RedirectedRoute exact={false} path={TO_LOGIN} component={Login} />
      <RedirectedRoute
        exact
        path={TO_PASSWORD_RESET}
        component={PasswordReset}
      />
      <RedirectedRoute
        exact
        path={TO_UNVERIFIED_EMAIL}
        component={UnverifiedEmail}
      />
      <RedirectedRoute
        exact
        path={TO_VERIFIED_EMAIL}
        component={ActivateEmail}
      />
      <ProtectedRoute
        exact
        path={TO_CREDIT_CARDS + "/new"}
        component={CardForm}
      />
      <ProtectedRoute
        exact
        path={TO_ADDRESSES + "/new"}
        component={CreateAddress}
      />
      <ProtectedRoute
        exact
        path={TO_ADDRESSES + "/:_id"}
        component={UpdateAddress}
      />
      <ProtectedRoute exact path={TO_CREDIT_CARDS} component={CreditCards} />
      <ProtectedRoute exact path={TO_ADDRESSES} component={Addresses} />
      <ProtectedRoute exact path={TO_CHECKOUT} component={CheckOut} />
      <ProtectedRoute
        exact
        path={TO_SELECT_ADDRESS}
        component={SelectAddress}
      />
      <ProtectedRoute exact path={TO_FAVOURITES} component={Favourites} />
      <ProtectedRoute exact path={TO_CARTS} component={Carts} />
      <ProtectedRoute exact path={TO_ORDERS} component={Orders} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
