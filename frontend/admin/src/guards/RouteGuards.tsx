import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("token"); // sau din context

export function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const location = useLocation();
  const from = (location.state)?.from?.pathname || "/";

  if (isAuthenticated()) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
