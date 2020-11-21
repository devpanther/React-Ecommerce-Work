import { useMutation, useQuery } from "@apollo/client";
import React, { createContext } from "react";
import { toast } from "react-toastify";

import Loading from "../components/shared/Loading";
import { DELETE_PAYMENT } from "../mutations/payment";
import { PAYMENTS } from "../queries/payment";

const CardContext = createContext();
CardContext.displayName = "CardContext";

const CardProvider = (props) => {
  const { data, loading, refetch, error } = useQuery(PAYMENTS);
  const [deletePayment] = useMutation(DELETE_PAYMENT);

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    try {
      await deletePayment({ variables: { _id } });
      toast.success("Deleted SuccessFully");
      refetch();
    } catch (error) {
      toast.error("Could not delete payment");
    }
  };

  if (loading) return <Loading />;
  return (
    <CardContext.Provider
      value={{
        refetchCards: refetch,
        handleDelete,
        cards: data ? data.payments : [],
        error,
        loading,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };
