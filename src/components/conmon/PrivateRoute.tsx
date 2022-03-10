import { Skeleton } from "antd";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant";
import { useAuth } from "../../features/auth/Context/authContext";

export function PrivateRoute() {
  // Check if user is logged
  const { isLogged, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Skeleton active />;
  }

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
