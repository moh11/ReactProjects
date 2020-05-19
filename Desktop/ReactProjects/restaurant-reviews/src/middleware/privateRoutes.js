import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

const PrivateRoute = ({ component: Component, role, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        ((Auth.isAuthenticated() === true && ( role === "any" || Auth.getRole() === role)) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ))
      }
    />
);

export default PrivateRoute;
