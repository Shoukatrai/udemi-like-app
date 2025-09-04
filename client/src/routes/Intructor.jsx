import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const Instructor = () => {
  const type = Cookies.get("type");
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (type === "instructor") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default Instructor;
