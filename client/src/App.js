import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import ActionsInitiation from "./views/ActionsInitiation";
import ActionsMonitoring from "./views/ActionsMonitoring";
import ActionsValidation from "./views/ActionsValidation";
import AfterValidation from "./views/AfterValidation";
import InvoiceFinalization from "./views/InvoiceFinalization";
import ActionsArchiving from "./views/ActionsArchiving";
import ViewNotifications from "./components/layout/MainNavbar/NavbarNav/ViewNotifications";
import DisplayAction from "./views/DisplayAction";
import DisplayArchivingAction from "./views/DisplayArchivingAction";
import EditUserProfile from "./components/layout/MainNavbar/dropdown-menu/EditUserProfile";
import Charts from "./views/Charts";
// Layout Types
import { DefaultLayout } from "./layouts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropzone-uploader/dist/styles.css'

export default () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <GuestRoute
        authenticated={isAuthenticated}
        component={Login}
        path={"/login"}
      />
      <GuestRoute
        authenticated={isAuthenticated}
        component={Signup}
        path={"/signup"}
      />
      <GuestRoute
        authenticated={isAuthenticated}
        component={ForgotPassword}
        path={"/forgot"}
      />
      <GuestRoute
        authenticated={isAuthenticated}
        component={ResetPassword}
        path={`/reset/:resetPasswordToken`}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={Charts}
        path={"/dashboard"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={ActionsInitiation}
        path={"/initiation-action"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={ActionsMonitoring}
        path={"/monitoring-action"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={DisplayAction}
        path={"/display-action/:id"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={DisplayArchivingAction}
        path={"/display-archiving-action/:id"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={ActionsValidation}
        path={"/action-validation"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={AfterValidation}
        path={"/after-validation"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={InvoiceFinalization}
        path={"/invoice-finalization"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={ActionsArchiving}
        path={"/action-archiving"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={EditUserProfile}
        path={"/edit-user-profile"}
        layout={DefaultLayout}
      />
      <AuthRoute
        authenticated={isAuthenticated}
        component={ViewNotifications}
        path={"/all-notifications"}
        layout={DefaultLayout}
      />
    </Switch>
  );
}

const GuestRoute = ({ component: Component, authenticated, ...rest }) => {
  const [loggedIn, setLoggedIn] = useState(authenticated);
  useEffect(() => {
    setLoggedIn(authenticated);
  }, [authenticated]);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const AuthRoute = ({ component: Component, authenticated, layout: Layout, ...rest }) => {
  const [loggedIn, setLoggedIn] = useState(authenticated);
  useEffect(() => {
    setLoggedIn(authenticated);
  }, [authenticated]);
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        loggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }} />
        )}
    />)
};





