import type { GeneralLetter } from "./general_letter";
import type { Official } from "./official";
import type { StudentLetter } from "./student_letter";

export type LetterSignature = {
  id: number;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
  officialId: number;
  position: string;
  isAcknowledged: boolean;
  signature?: string;
  verifiedAt?: string;
  token: string;
  occupation: string;
  uniqueCode: string;
  code: string;
  studentLetterSubmission?: StudentLetter;
  official: Official;
  generalLetterSubmission?: GeneralLetter;
  createdAt: string;
  updatedAt: string;
};

export type LetterSignatureCreatePayload = {
  position: string;
  isAcknowledged: boolean;
  officialId: number;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
};

export type LetterSignatureUpdatePayload = {
  signature: any;
  verifiedAt?: string;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
};

export interface LetterSignaturePaginatedResponse {
  data: LetterSignature[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
