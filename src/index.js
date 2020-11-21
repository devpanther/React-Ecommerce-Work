import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "./App";
import { UserProvider } from "./context/user";
import { CartProvider } from "./context/cart";
import { CardProvider } from "./context/card";
import { AddressProvider } from "./context/address";
import client from "./client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

render(
  <Elements stripe={stripePromise}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <CardProvider>
              <AddressProvider>
                <App />
              </AddressProvider>
            </CardProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Elements>,
  document.getElementById("root")
);
