import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute;
