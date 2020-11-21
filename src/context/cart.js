import { useMutation, useQuery } from "@apollo/client";
import React, { createContext } from "react";
import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";
import { TOGGLE_CART } from "../mutations/recipe";
import Loading from "../components/shared/Loading";
import { USER_CART } from "../queries/user";
import { TO_LOGIN } from "../utils/constants";
import { SHOPPING_CARTS } from "../queries/recipe";
import { DELETE_CART } from "../mutations/recipe";
import _ from "lodash";

const CartContext = createContext();
CartContext.displayName = "CartContext";

const CartProvider = (props) => {
  const { data, loading, refetch } = useQuery(USER_CART);
  const { data: data1, loading: loading1, refetch: refetch1 } = useQuery(
    SHOPPING_CARTS,
    {
      variables: { cart: true },
    }
  );
  const [deleteCart] = useMutation(DELETE_CART);

  const [toggleCart] = useMutation(TOGGLE_CART);
  const history = useHistory();

  const handleAddToCart = async (e, recipeId) => {
    e.preventDefault();
    try {
      await toggleCart({ variables: { recipeId, add: true } });
      refetch();
    } catch (e) {
      if (e.message === "Unauthorized")
        return history.push(TO_LOGIN, `/recipe/${recipeId}`);
    }
  };

  const handleRemoveFromCart = async (e, recipeId) => {
    e.preventDefault();
    try {
      await toggleCart({ variables: { recipeId, add: false } });
      refetch();
    } catch (e) {
      if (e.message === "Unauthorized")
        return history.push(TO_LOGIN, `/recipe/${recipeId}`);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await deleteCart({ variables: { recipeId: id } });
      await refetch();
      await refetch1();
    } catch (e) {
      toast.error("Could not delete item");
    }
  };

  if (loading || loading1) return <Loading />;
  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        handleRemoveFromCart,
        handleDelete,
        refetchCart: refetch,
        refetchRecipe: refetch1,
        cartObj: _.countBy(data && data.user ? data.user.carts : []),
        carts: data && data.user ? data.user.carts : [],
        isLoading: loading && loading1,
        recipes:
          data1 && data1.recipesByCategory ? data1.recipesByCategory : [],
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
