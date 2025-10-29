import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

function ProtectedRoutes() {
  const token = useAuth();
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
