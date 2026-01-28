import type { UserResponse } from "./auth";
import type { Institution } from "./institution";
import type { Letter } from "./letter";
import type { LetterAttributeSubmission } from "./letter_attribute_submission";

export type GeneralLetter = {
  id: number;
  token: string;
  userId: number;
  institutionId: number;
  letterId: number;
  letterNumber: string;
  name: string;
  letterDate: string;
  signatureType: string;
  carbonCopy: string;
  user: UserResponse;
  letter: Letter;
  institution: Institution;
  letterAttributeSubmissions: LetterAttributeSubmission[];
  createdAt: string;
  updatedAt: string;
};

export type GeneralLetterCreatePayload = {
  letterId: number;
  letterNumber: string;
  name: string;
  signatureType: string;
  letterDate: string;
  attributes: {
    attributeId: number;
    content: string;
  }[];
};

export type GeneralLetterUpdatePayload = {
  letterNumber: string;
  name: string;
  signatureType: string;
  letterDate: string;
  attributes: {
    attributeId: number;
    content: string;
  }[];
  carbonCopy?: string;
};

export type GeneralLetterCarbonCopyPayload = {
  carbonCopy: string;
}

export interface GeneralLetterPaginatedResponse {
  data: GeneralLetter[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
