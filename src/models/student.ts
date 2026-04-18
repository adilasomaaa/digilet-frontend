import type { UserResponse } from "./auth";
import type { Institution } from "./institution";

export type Student = {
  id: number;
  fullname: string;
  institutionId: number;
  institution: Institution;
  userId: number;
  user: UserResponse;
  address: string;
  nim: string;
  phoneNumber: string;
  birthday?: string | null;
  birthplace?: string | null;
  gender: string;
  classYear: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentCreatePayload = {
  fullname: string;
  institutionId: number;
  email: string;
  address: string;
  nim: string;
  classYear: string;
  phoneNumber?: string;
  birthday?: string;
  birthplace?: string;
  gender: string;
};

export type StudentUpdatePayload = {
  fullname: string;
  institutionId: number;
  email: string;
  address: string;
  nim: string;
  classYear: string;
  phoneNumber?: string;
  birthday?: string;
  birthplace?: string;
  gender: string;
};

export interface StudentPaginatedResponse {
  data: Student[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
