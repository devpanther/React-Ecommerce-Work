import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      _id
      email
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation($_id: String, $email: String) {
    verifyEmail(_id: $_id, email: $email)
  }
`;

export const ACTIVATE_EMAIL = gql`
  mutation($token: String!) {
    activateEmail(token: $token)
  }
`;

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

export const RESET_PASSWORD = gql`
  mutation($token: String!, $password: String) {
    resetPassword(token: $token, password: $password)
  }
`;

export const RESET_TOKEN = gql`
  mutation($email: String!) {
    sendResetToken(email: $email)
  }
`;
