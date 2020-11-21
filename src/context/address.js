import { useMutation, useQuery } from "@apollo/client";
import React, { createContext } from "react";
import { toast } from "react-toastify";

import Loading from "../components/shared/Loading";
import { DELETE_ADDRESS } from "../mutations/address";
import { ADDRESSES } from "../queries/address";

const AddressContext = createContext();
AddressContext.displayName = "AddressContext";

const AddressProvider = (props) => {
  const { data, loading, refetch, error } = useQuery(ADDRESSES);
  const [deletePayment] = useMutation(DELETE_ADDRESS);

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
    <AddressContext.Provider
      value={{
        refetchAddresses: refetch,
        handleDelete,
        addresses: data ? data.addresses : [],
        error,
        loading,
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
};

export { AddressProvider, AddressContext };
