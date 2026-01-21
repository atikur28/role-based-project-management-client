import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

interface RouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/login",
}: RouteProps) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to={redirectTo} />;
};

export const AdminRoute = ({
  children,
  redirectTo = "/dashboard",
}: RouteProps) => {
  const { user } = useAuth();
  return user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} />
  );
};
