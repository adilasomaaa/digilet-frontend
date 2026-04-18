import type { Letter } from "./letter";

export type LetterTemplate = {
  id: number;
  letterId: number;
  content: string;
  letter: Letter;
  createdAt: string;
  updatedAt: string;
};

export type LetterTemplateCreatePayload = {
  content: string;
  letterId: number;
};

export type LetterTemplateUpdatePayload = {
  content: string;
  letterId: number;
};

export interface LetterTemplatePaginatedResponse {
  data: LetterTemplate[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
