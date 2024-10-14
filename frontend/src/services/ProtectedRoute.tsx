import React from "react";
import { useAuthServiceContext } from "../context/useAuthServiceContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuthServiceContext();

  const loggedFromStorage = localStorage.getItem("isLoggedIn") ??  false
  const isAuth = isLoggedIn ? isLoggedIn : loggedFromStorage

  return isAuth ? <div>{children}</div> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
