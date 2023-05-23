/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const token = sessionStorage.getItem("token");

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
