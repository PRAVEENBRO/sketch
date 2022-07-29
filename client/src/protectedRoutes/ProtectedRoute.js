import React from "react";
import { Navigate , Route } from "react-router-dom";

function Router({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  // console.log("this", JSON.parse(isAuthenticated));

  return (
    <Route 
      {...restOfProps}
      element={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate  to="/" />
      }
    />
  );
}

export default Router;