import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyStaffPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userRole = currentUser && currentUser.rest.role;
  
  const allowedRoles = ["admin", "pharmasist", "stock keeper", "deliver partner", "cashier"];
  const isAllowedRole = allowedRoles.includes(userRole);

  return isAllowedRole ? <Outlet /> : <Navigate to="/" />;
};

export default OnlyStaffPrivateRoute;

