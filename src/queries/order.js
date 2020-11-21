import { gql } from "@apollo/client";

export const ORDERS = gql`
  query {
    orders {
      id
      amount
      orderId
      description
      payment_method
      created
      customer
      status
      source {
        last4
        brand
      }
    }
  }
`;
