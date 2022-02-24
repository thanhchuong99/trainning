import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant";

export function PrivateRoute() {
  // Check if user is logged
  const isLogged = Boolean(localStorage.getItem(ACCESS_TOKEN));
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
