import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import { axiosWithAuth } from "../helpers/axiosWithAuth"; UNUSED VARIABLE

import schema from "../validation/SignInSchema";
import SignInForm from "../components/SignInForm";
import axios from "axios";

/*
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const history = useHistory();
  const [credentials, setCredentials] = useState(initialState);

  //The SignIn is not working fully yet.
  const handleChanges = (e) => {
    // console.log("value: ", e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    // validate();

    axiosWithAuth
      .post("/auth/register", credentials)
      .then((res) => {
        console.log("happy path: ", res.data);
        // localStorage.setItem("token", res.data);
        // history.push("/private");
      })
      .catch((err) => {
        console.log("sad path: ", err);
      });
  };

*/

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

export default function SignIn() {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const logInUser = (userInformation) => {
    // should I check if allUsers includes userInformation before or after the axios.get()?
    axios
      .post(
        "https://secret-family-recipes6.herokuapp.com/api/auth/login",
        userInformation
      )
      .then((res) => {
        console.log("Login info: ", res.data);
        // console.log("MY token", res.data.token);
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        // alert("failed!");
        console.log("sad path: ", err);
        // debugger;
      })
      .finally(setFormValues(initialFormValues));
  };

  const formSubmit = () => {
    const userInformation = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };

    logInUser(userInformation);
  };

  return (
    <>
      <SignInForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </>
  );
}
