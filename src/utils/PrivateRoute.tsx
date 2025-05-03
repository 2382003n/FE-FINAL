import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  // If user is not authenticated (no token), redirect to login
  // If authenticated, show the private route
  return !localStorage.getItem("token") ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
