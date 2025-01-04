import React from "react";
import { Route, Redirect } from "react-router-dom";

// This component checks if the user is authenticated before rendering the route.
// If the user is authenticated, it renders the component; otherwise, it redirects to the login page.
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Check if the user is authenticated by looking for the token in localStorage
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? ( // If authenticated, render the component
          <Component {...props} />
        ) : ( // If not authenticated, redirect to login page
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

