import { gql } from "@apollo/client";

export const ADDRESSES = gql`
  query {
    addresses {
      _id
      name
      address
      state
      city
      country
      postalCode
      userId
    }
  }
`;

export const ADDRESS = gql`
  query($_id: ID!) {
    address(_id: $_id) {
      _id
      name
      address
      state
      city
      country
      postalCode
      userId
    }
  }
`;
