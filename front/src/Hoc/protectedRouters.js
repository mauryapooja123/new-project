import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const auth = localStorage.getItem("admin_token");

  return auth ? <Navigate to="/course" /> : children;
}

export default ProtectedRoutes;
