import React, { useState } from "react";
import {
  Button,
  MenuItem,
  CircularProgress,
  Collapse,
  Avatar,
  useTheme,
} from "@material-ui/core";
import { CssTextField, useStyles } from "../styles/form";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useStyles as useStyles1 } from "../styles/loading";
import { Alert } from "@material-ui/lab";

const useForm = (initialValues) => {
  const theme = useTheme();
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const classes1 = useStyles1();

  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: theme.palette.text.primary,
        "::placeholder": {
          color: theme.palette.text.secondary,
        },
      },
      invalid: {
        color: "#f44336",
      },
      complete: {},
    },
  };

  const validate = () => {
    let errors = Object.values(formErrors);

    if (!errors.length) return false;
    return true;
  };

  const handleChange = (validate, { currentTarget: input }) => {
    const errors = { ...formErrors };
    if (validate) {
      const error = validate(input.value);
      if (error) errors[input.name] = error;
      else delete errors[input.name];
    }

    const data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
    setFormErrors(errors);
  };

  const handleCardChange = async ({ error, empty, complete }, name) => {
    const errors = { ...formErrors };

    if ((error && error.message) || empty) {
      errors[name] = error ? error.message : "";
    } else if (complete) {
      delete errors[name];
    }

    setFormErrors(errors);
  };

  const handleBlur = (validate, { currentTarget: input }) => {
    const errors = { ...formErrors };
    if (validate) {
      const error = validate(input.value);
      if (error) {
        errors[input.name] = error;
      } else {
        delete errors[input.name];
      }
    }

    const data = { ...formData };
    data[input.name] = input.value;
    setFormData(data);
    setFormErrors(errors);
  };

  const handleSelect = (validate, { target: { name, value } }) => {
    const errors = { ...formErrors };
    if (validate) {
      const error = validate(value);
      if (error) {
        errors[name] = error;
      } else {
        delete errors[name];
      }
    }
    const data = { ...formData };
    data[name] = value;
    setFormData(data);
    setFormErrors(errors);
  };

  const renderCardElement = (label = "number") => {
    if (label === "number")
      return (
        <>
          <CardNumberElement
            onChange={(e) => handleCardChange(e, label)}
            onBlur={(e) => handleCardChange(e, label)}
            options={options}
          />
          {formErrors[label] && (
            <p className="MuiFormHelperText-root helper-text Mui-error">
              {formErrors[label]}
            </p>
          )}
        </>
      );

    if (label === "date")
      return (
        <>
          <CardExpiryElement
            onChange={(e) => handleCardChange(e, label)}
            onBlur={(e) => handleCardChange(e, label)}
            options={options}
          />
          {formErrors[label] && (
            <p className="MuiFormHelperText-root helper-text Mui-error">
              {formErrors[label]}
            </p>
          )}
        </>
      );

    if (label === "cvc")
      return (
        <>
          <CardCvcElement
            onChange={(e) => handleCardChange(e, label)}
            onBlur={(e) => handleCardChange(e, label)}
            options={options}
          />
          {formErrors[label] && (
            <p className="MuiFormHelperText-root helper-text Mui-error">
              {formErrors[label]}
            </p>
          )}
        </>
      );
  };

  const renderButton = (label) => {
    return (
      <Button
        disabled={submitted ? submitted : validate()}
        fullWidth
        className={classes.submit}
        variant="contained"
        type="submit"
      >
        {submitted ? (
          <CircularProgress size={20} className={classes1.spinner} />
        ) : (
          label
        )}
      </Button>
    );
  };

  const renderInput = (
    name,
    label,
    validate,
    placeholder = "",
    type = "text"
  ) => {
    return (
      <CssTextField
        variant="outlined"
        placeholder={placeholder}
        label={label}
        type={type}
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(validate, e)}
        onBlur={(e) => handleBlur(validate, e)}
        fullWidth
        className={classes.input}
        helperText={formErrors[name] && formErrors[name]}
        error={formErrors[name] ? true : false}
      />
    );
  };

  const renderSelect = (name, label, options, validate) => {
    return (
      <CssTextField
        id="outlined-select-currency"
        name={name}
        select
        value={formData[name]}
        label={label}
        onChange={(e) => handleSelect(validate, e)}
        onBlur={(e) => handleSelect(validate, e)}
        helperText={formErrors[name] && formErrors[name]}
        error={formErrors[name] ? true : false}
        fullWidth
        variant="outlined"
      >
        {options.map((option, index) =>
          option.logo ? (
            <MenuItem
              style={{ display: "flex", alignItems: "center" }}
              key={index}
              value={option.value}
            >
              <Avatar
                src={option.logo}
                style={{ height: "25px" }}
                variant="square"
                component="span"
              />
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "0.5rem",
                  width: "min-content",
                }}
              >
                {option.label}
              </span>
            </MenuItem>
          ) : (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          )
        )}
      </CssTextField>
    );
  };

  const renderError = () =>
    error && (
      <center>
        <Collapse in={open}>
          <Alert
            severity="error"
            style={{ marginBottom: "1rem", width: "fit-content" }}
            onClose={() => setOpen(false)}
          >
            {error}
          </Alert>
        </Collapse>
      </center>
    );

  const renderSuccess = () =>
    success && (
      <center>
        <Collapse in={open}>
          <Alert
            severity="success"
            style={{ marginBottom: "1rem", width: "fit-content" }}
            onClose={() => setOpen(false)}
          >
            {success}
          </Alert>
        </Collapse>
      </center>
    );

  return {
    renderInput,
    renderSelect,
    renderButton,
    renderError,
    renderSuccess,
    renderCardElement,
    formData,
    formErrors,
    error,
    success,
    setFormErrors,
    setError,
    setOpen,
    setFormData,
    setSubmitted,
    setSuccess,
  };
};

export default useForm;
