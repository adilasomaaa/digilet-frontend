import type { Letter } from "./letter";

export type LetterAttribute = {
  id: number;
  letterId: number;
  attributeName: string;
  placeholder: string;
  label: string;
  type: string;
  isRequired: boolean;
  isVisible: boolean;
  isEditable: boolean;
  letter: Letter;
  createdAt: string;
  updatedAt: string;
};

export type LetterAttributeCreatePayload = {
  letterId: number;
  attributeName: string;
  placeholder: string;
  label: string;
  type: string;
  isRequired: boolean;
  isVisible: boolean;
  isEditable: boolean;
};

export type LetterAttributeUpdatePayload = {
  letterId: number;
  attributeName: string;
  placeholder: string;
  label: string;
  type: string;
  isRequired: boolean;
  isVisible: boolean;
  isEditable: boolean;
};

export interface LetterAttributePaginatedResponse {
  data: LetterAttribute[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
