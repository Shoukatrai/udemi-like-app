import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default AuthRoute;
