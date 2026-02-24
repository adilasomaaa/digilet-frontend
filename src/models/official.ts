import type { UserResponse } from "./auth";
import type { Institution } from "./institution";

export type Official = {
  id: number;
  name: string;
  institutionId?: number;
  occupation: string;
  nip: string;
  institution?: Institution | null;
  user?: UserResponse | null;
  createdAt: string;
  updatedAt: string;
};

export type OfficialCreatePayload = {
  name: string;
  institutionId?: number;
  occupation: string;
  email: string;
  nip: string;
};

export type OfficialUpdatePayload = {
  name: string;
  institutionId?: number;
  occupation: string;
  email: string;
  nip: string;
};

export interface OfficialPaginatedResponse {
  data: Official[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
