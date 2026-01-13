import type { Letter } from "./letter";

export type LetterDocument = {
  id: number;
  letterId: number;
  documentName: string;
  fileType: string;
  isRequired: boolean;
  letter: Letter;
  createdAt: string;
  updatedAt: string;
};

export type LetterDocumentCreatePayload = {
  letterId: number;
  documentName: string;
  fileType: string;
  isRequired: boolean;
};

export type LetterDocumentUpdatePayload = {
  letterId: number;
  documentName: string;
  fileType: string;
  isRequired: boolean;
};

export interface LetterDocumentPaginatedResponse {
  data: LetterDocument[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
