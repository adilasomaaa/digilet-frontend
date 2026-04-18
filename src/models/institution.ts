export type Institution = {
  id: number;
  name: string;
  address: string;
  type: "university" | "faculty" | "study_program" | "institution";
  parentId?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type InstitutionCreatePayload = {
  name: string;
  address?: string;
  type: "university" | "faculty" | "study_program" | "institution";
  parentId?: number;
};

export type InstitutionUpdatePayload = {
  name?: string;
  address?: string;
  type?: "university" | "faculty" | "study_program" | "institution";
  parentId?: number;
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
