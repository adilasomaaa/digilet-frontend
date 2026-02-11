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
  personnel?: {
    position: string;
  };
  student?: {
    nim: string;
    fullname : string;
    institution: {
      name: string;
    };
    classYear: string;
    address: string;
    phoneNumber: string;
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
