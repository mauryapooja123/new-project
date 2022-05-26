import React from "react";
import { Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("admin_token");

  return auth ? children : <Navigate to="/" />;
}
export default PrivateRoute;
