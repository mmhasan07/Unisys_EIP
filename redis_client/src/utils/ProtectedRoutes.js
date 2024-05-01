import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/login" />
  );
};


export const LoginSignupProtectedRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Navigate to="/" /> : <Fragment> <Component {...props} /> </Fragment>
  );
};

