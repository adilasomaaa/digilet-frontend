export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  id: number;
  email: string;
  name: string;
  userRoles: {
    name: string;
    rolePermissions: string[];
  };
};

export type LoginResponse = {
  status: boolean;
  token: string;
};

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
