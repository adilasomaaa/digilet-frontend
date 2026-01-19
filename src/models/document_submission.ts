import type { Institution } from "./institution";

export type DocumentSubmission = {
  id: number;
  studentLetterSubmissionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
  institution: Institution;
  createdAt: string;
  updatedAt: string;
};

export type DocumentSubmissionCreatePayload = {
  institutionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
};

export type DocumentSubmissionUpdatePayload = {
  institutionId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
};

export interface DocumentSubmissionPaginatedResponse {
  data: DocumentSubmission[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
