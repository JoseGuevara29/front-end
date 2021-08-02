import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useMemo } from "react";

import PrivateRoute from "./components/PrivateRoute";

import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import AddRecipe from "./views/AddRecipe";

import { UserContext } from "./context/UserContext";
// import { axiosWithAuth } from "./helpers/axiosWithAuth"; UNUSED VARIABLE
import EditRecipe from "./views/EditRecipe";

export default function App() {
  // const initialValues = [
  //   {
  //     id: "333300",
  //     job: "Accounting",
  //     name: "Josh",
  //   },
  //   {
  //     id: "3333001",
  //     job: "HR",
  //     name: "Damian",
  //   },
  //   {
  //     id: "3333002",
  //     job: "IT",
  //     name: "John",
  //   },
  // ];
  const initialValues = [];
  const [user, setUser] = useState(initialValues);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <UserContext.Provider value={providerValue}>
        <Router>
          <Switch>
            <PrivateRoute path="/EditRecipe/:id" component={EditRecipe} />
            <PrivateRoute path="/AddRecipe" component={AddRecipe} />
            <PrivateRoute path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={SignIn} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}
