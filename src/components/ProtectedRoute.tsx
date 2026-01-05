import { useAuth } from "../context/AuthContext";
import { hasAllPerms, hasAnyRole } from "../lib/rbac";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  roles?: string[];
  permissions?: string[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  roles,
  permissions,
  redirectTo = "/landing",
}: Props) {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token || !user) return <Navigate to="/login" replace />;

  if (!hasAnyRole(user, roles)) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!hasAllPerms(user, permissions)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
