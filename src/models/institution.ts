export type Institution = {
  id: number;
  name: string;
  address: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type InstitutionCreatePayload = {
  name: string;
  address: string;
  type: string;
};

export type InstitutionUpdatePayload = {
  name: string;
  address: string;
  type: string;
};

export interface InstitutionPaginatedResponse {
  data: Institution[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
