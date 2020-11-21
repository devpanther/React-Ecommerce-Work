import { gql } from "@apollo/client";

export const ADD_PAYMENT = gql`
  mutation($cardId: String!) {
    addPayment(cardId: $cardId)
  }
`;

export const DELETE_PAYMENT = gql`
  mutation($_id: ID!) {
    deletePayment(_id: $_id)
  }
`;

export const GET_SECRET = gql`
  mutation {
    getSecret
  }
`;
