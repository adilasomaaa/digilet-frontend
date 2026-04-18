import type { Letter } from "./letter";
import type { Official } from "./official";

export type LetterSignatureTemplate = {
  id: number;
  letterId: number;
  officialId: number;
  position: string;
  token?: string;
  official: Official;
  letter: Letter;
  createdAt: string;
  updatedAt: string;
};

export type LetterSignatureTemplateCreatePayload = {
  letterId: number;
  officialId: number;
  position: string;
};

export type LetterSignatureTemplateUpdatePayload = {
  letterId: number;
  officialId: number;
  position: string;
};

export interface LetterSignatureTemplatePaginatedResponse {
  data: LetterSignatureTemplate[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
