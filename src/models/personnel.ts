import type { UserResponse } from "./auth";
import type { Institution } from "./institution";

export type Personnel = {
  id: number;
  name: string;
  position: string;
  institutionId: number;
  userId: number;
  institution: Institution;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
};

export type PersonnelCreatePayload = {
  name: string;
  email: string;
  position: string;
  institutionId: number;
};

export type PersonnelUpdatePayload = {
  name: string;
  email: string;
  position: string;
  institutionId: number;
};

export interface PersonnelPaginatedResponse {
  data: Personnel[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
