import { USER_KEY } from "../utils/constants";

export const setCurrentUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getCurrentUser = () => {
  try {
    const string = localStorage.getItem(USER_KEY);
    const user = JSON.parse(string);
    return user;
  } catch (ex) {
    return null;
  }
};

export const removeCurrentUser = () => {
  localStorage.removeItem(USER_KEY);
};
