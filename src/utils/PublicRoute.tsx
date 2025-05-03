import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  // If user is authenticated (has token), redirect to home
  // If not authenticated, show the public route
  return localStorage.getItem("token") ? <Navigate to="/" /> : children;
};

export default PublicRoute;
