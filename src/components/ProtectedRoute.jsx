import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";

const ProtectedRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
