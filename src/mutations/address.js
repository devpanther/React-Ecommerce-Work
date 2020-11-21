import { gql } from "@apollo/client";

export const ADD_ADDRESS = gql`
  mutation(
    $name: String!
    $address: String!
    $state: String!
    $city: String!
    $country: String!
    $postalCode: String!
  ) {
    addAddress(
      name: $name
      address: $address
      state: $state
      city: $city
      country: $country
      postalCode: $postalCode
    )
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation(
    $_id: ID!
    $name: String!
    $address: String!
    $state: String!
    $city: String!
    $country: String!
    $postalCode: String!
  ) {
    updateAddress(
      _id: $_id
      name: $name
      address: $address
      state: $state
      city: $city
      country: $country
      postalCode: $postalCode
    )
  }
`;

export const DELETE_ADDRESS = gql`
  mutation($_id: ID!) {
    deleteAddress(_id: $_id)
  }
`;
