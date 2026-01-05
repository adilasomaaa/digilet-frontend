import type { AuthResponse } from "../models";

export function getRole(user?: AuthResponse | null) {
  return user?.userRoles?.name ?? null;
}

export function hasAnyRole(
  user: AuthResponse | null | undefined,
  allow?: string[]
) {
  if (!allow || allow.length === 0) return true; // jika tidak diset, lolos
  const role = getRole(user);
  return !!role && allow.includes(role);
}

export function hasAllPerms(
  user: AuthResponse | null | undefined,
  perms?: string[]
) {
  if (!perms || perms.length === 0) return true;
  const list = user?.userRoles?.rolePermissions ?? [];
  return perms.every((p) => list.includes(p));
}
