import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
  mutation($recipeId: ID!) {
    toggleLike(recipeId: $recipeId)
  }
`;

export const TOGGLE_CART = gql`
  mutation($recipeId: ID!, $add: Boolean!) {
    toggleCart(recipeId: $recipeId, add: $add)
  }
`;

export const DELETE_CART = gql`
  mutation($recipeId: ID!) {
    deleteCart(recipeId: $recipeId)
  }
`;
