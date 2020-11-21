import { gql } from "@apollo/client";

export const TAKE_ORDER = gql`
  mutation($paymentId: ID!, $addressId: ID!) {
    takeOrder(paymentId: $paymentId, addressId: $addressId)
  }
`;
