import type { Institution } from "./institution";

export type Header = {
  id: number;
  institutionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
  institution: Institution;
  createdAt: string;
  updatedAt: string;
};

export type HeaderCreatePayload = {
  institutionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string | FileList;
};

export type HeaderUpdatePayload = {
  institutionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string | FileList;
};

export interface HeaderPaginatedResponse {
  data: Header[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
