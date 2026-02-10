import { useAuth } from "../context/AuthContext";
import { hasAllPerms, hasAnyRole } from "../lib/rbac";
import { Navigate } from "react-router";
import Forbidden from "./dashboard/Forbidden";

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
}: Props) {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return null;

  if (!token || !user) return <Navigate to="/login" replace />;

  if (!hasAnyRole(user, roles)) {
    return <Forbidden />;
  }

  if (!hasAllPerms(user, permissions)) {
    return <Forbidden />;
  }

  return <>{children}</>;
}
