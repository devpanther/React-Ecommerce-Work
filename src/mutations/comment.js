import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation($recipeId: ID!, $rating: Int!, $text: String!) {
    addComment(recipeId: $recipeId, text: $text, rating: $rating)
  }
`;

export const UPDATE_COMMENT = gql`
  mutation($_id: ID!, $rating: Int!, $text: String!) {
    updateComment(_id: $_id, rating: $rating, text: $text)
  }
`;

export const DELETE_COMMENT = gql`
  mutation($_id: ID!) {
    deleteComment(_id: $_id)
  }
`;
