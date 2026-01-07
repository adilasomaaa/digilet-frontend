import type { UserResponse } from "./auth";

export type Letter = {
  id: number;
  userId: number;
  letterName: string;
  referenceNumber: string;
  expiredDate: number;
  letterNumberingStart: number;
  category: string;
  signatureType: string;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
};

export type LetterCreatePayload = {
  letterName: string;
  referenceNumber: string;
  expiredDate: number;
  letterNumberingStart: number;
  category: string;
  signatureType: string;
};

export type LetterUpdatePayload = {
  letterName: string;
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