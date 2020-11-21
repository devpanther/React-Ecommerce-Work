import { gql } from "@apollo/client";

export const RECIPE = gql`
  query($_id: ID!) {
    recipe(_id: $_id) {
      _id
      name
      image
      pricePerServing
      cuisines
      dishTypes
      diets
      likes
      orders {
        _id
      }
      comments {
        _id
        rating
        text
        userId {
          _id
          lastname
          firstname
        }
        updatedAt
        createdAt
      }
      nutrients {
        _id
        name
        amount
        unit
      }
    }
  }
`;

export const RECIPES_BY_CATEGORY = gql`
  query($title: String, $veryPopular: Boolean, $price: Int, $count: Int) {
    recipesByCategory(
      title: $title
      veryPopular: $veryPopular
      price: $price
      count: $count
    ) {
      _id
      name
      image
      pricePerServing
      likes
      comments {
        rating
      }
    }
  }
`;

export const FAVORITE_RECIPES = gql`
  query($liked: Boolean) {
    recipesByCategory(liked: $liked) {
      _id
      name
      image
      pricePerServing
    }
  }
`;

export const SHOPPING_CARTS = gql`
  query($cart: Boolean) {
    recipesByCategory(cart: $cart) {
      _id
      name
      image
      pricePerServing
    }
  }
`;
