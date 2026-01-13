import type { UserResponse } from "./auth";
import type { Header } from "./header";
import type { Institution } from "./institution";
import type { LetterAttribute } from "./letter_attribute";

export type Letter = {
  id: number;
  institutionId: number;
  institution: Institution;
  userId: number;
  letterHeadId?: number;
  letterName: string;
  referenceNumber: string;
  expiredDate: number;
  letterNumberingStart: number;
  category: string;
  signatureType: string;
  user: UserResponse;
  letterHead: Header;
  letterAttributes?: LetterAttribute[];
  createdAt: string;
  updatedAt: string;
};

export type LetterCreatePayload = {
  letterName: string;
  letterHeadId: number;
  referenceNumber: string;
  expiredDate: number;
  letterNumberingStart: number;
  category: string;
  signatureType: string;
};

export type LetterUpdatePayload = {
  letterName: string;
  letterHeadId: number;
  referenceNumber: string;
  expiredDate: number;
  letterNumberingStart: number;
  category: string;
  signatureType: string;
};

export interface LetterPaginatedResponse {
  data: Letter[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
