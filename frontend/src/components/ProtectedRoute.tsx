import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }: any) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.rol)) return <Navigate to="/login" replace />;

   return <Outlet />; 
};

export default ProtectedRoute;

