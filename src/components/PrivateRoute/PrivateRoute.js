import React from "react";
import { TOKEN_STORAGE_KEY, USER_ROLE_STORAGE_KEY } from "../../constants";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY);

  if (!token || !["ADMIN", "STAFF"].includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
