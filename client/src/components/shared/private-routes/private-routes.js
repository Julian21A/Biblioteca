import React from "react";
import { Navigate } from "react-router-dom";

const UnlogRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

export default UnlogRoute;
