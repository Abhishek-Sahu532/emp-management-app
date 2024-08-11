import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const{ success} = useSelector((state) => state.user);

  if (!success) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}