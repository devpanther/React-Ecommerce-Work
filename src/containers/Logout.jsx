import { useMutation } from "@apollo/client";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { LOGOUT_USER } from "../mutations/user";
import { removeCurrentUser } from "../services/authService";
import { TO_HOME } from "../utils/constants";

const Logout = ({ history }) => {
  const [logout] = useMutation(LOGOUT_USER);
  const { refetch, user } = useContext(UserContext);

  const handleLogOut = async () => {
    if (!user) {
      return history.push(TO_HOME);
    }
    await logout();
    refetch();
    removeCurrentUser();
    window.location = TO_HOME;
  };
  // useEffect(() => {
  handleLogOut();
  // }, []);
  return null;
};

export default Logout;
