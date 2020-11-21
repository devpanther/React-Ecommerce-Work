import validator from "validator";

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) return "Email is not valid";
  if (!validator.isLength(email, { max: 250 }))
    return "Email should not be more than 250 characters";
};

export const validateName = (name) => {
  if (!validator.matches(name, /^[a-z ,.'-]+$/i))
    return "Field should contain letters or `,.'-`";
};

export const validateNameWithMessage = (errorMessage) => (name) => {
  if (!validator.matches(name, /^[a-z ,.'-]+$/i)) return errorMessage;
};

export const validatePassword = (password) => {
  if (!validator.isLength(password, { min: 6, max: 1024 }))
    return "Password must contain at least 6 characters";
};

export const validateConfirmPassword = (data) => (password) => {
  if (!validator.equals(password, data)) return "Passwords do not match";
};

export const validateWithMessage = (errorMessage) => (name) => {
  if (validator.isEmpty(name)) return errorMessage;
};
