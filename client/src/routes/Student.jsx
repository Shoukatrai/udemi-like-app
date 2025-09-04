import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const Student = () => {
  const type = Cookies.get("type");
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (type === "student") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default Student;
