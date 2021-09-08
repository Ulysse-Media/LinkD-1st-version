import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store.js";
import { createBrowserHistory } from "history";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./actions/auth-actions/actions";
import {
  CircularProgress,
} from '@material-ui/core';
export let history = createBrowserHistory();

const token = localStorage.getItem("LinkD");
const user_id = localStorage.getItem("user_id");

const WrappedApp = ({ children, props }) => {

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state.authReducer
  );
// Component on mount
  useEffect(() => {
    if (token) {
      dispatch(getAuthUser(user_id));
    }
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <CircularProgress color="primary" /> // Loading Spinner
      ) : (
        children
      )}
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <WrappedApp>
      <Router>
        <App />
      </Router>
    </WrappedApp>
  </Provider>,
  document.getElementById('root')
);

// to log results (for example: reportWebVitals(console.log))
reportWebVitals();

