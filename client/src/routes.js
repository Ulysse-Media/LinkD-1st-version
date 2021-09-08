import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, AuthenticationLayout } from "./layouts";

// Route Views
import Charts from "./views/Charts";
import DisplayAction from "./views/DisplayAction";
import ActionsInitiation from "./views/ActionsInitiation";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/signup",
    layout: AuthenticationLayout,
    component: Signup
  },
  {
    path: "/login",
    layout: AuthenticationLayout,
    component: Login
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Charts
  },
  {
    path: "/display-action/:id",
    layout: DefaultLayout,
    component: DisplayAction
  },
  {
    path: "/initiation-action/",
    layout: DefaultLayout,
    component: ActionsInitiation
  },
];
