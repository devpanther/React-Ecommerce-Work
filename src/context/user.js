import { useQuery } from "@apollo/client";
import React, { createContext, useEffect } from "react";
import Loading from "../components/shared/Loading";
import { USER } from "../queries/user";
import { setCurrentUser } from "../services/authService";

const UserContext = createContext();
UserContext.displayName = "UserContext";

const UserProvider = (props) => {
  const { data, loading, refetch } = useQuery(USER);

  useEffect(() => {
    if (!loading && data) {
      setCurrentUser(data.user);
    }
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        user: data === undefined ? null : data.user,
        refetch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
