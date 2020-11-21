import { gql } from "@apollo/client";

export const PAYMENTS = gql`
  query {
    payments {
      _id
      created
      cardId
      type
      customer
      brand
      name
      last4
      exp_month
      exp_year
    }
  }
`;
