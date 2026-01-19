import type { GeneralLetter } from "./general_letter";
import type { LetterSignatureTemplate } from "./letter_signature_template";
import type { StudentLetter } from "./student_letter";

export type LetterSignature = {
  id: number;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
  letterSignatureTemplateId: number;
  signature?: string;
  verifiedAt?: string;
  token: string;
  code: string;
  studentLetterSubmission?: StudentLetter;
  generalLetterSubmission?: GeneralLetter;
  letterSignatureTemplate: LetterSignatureTemplate;
  createdAt: string;
  updatedAt: string;
};

export type LetterSignatureCreatePayload = {
  letterSignatureTemplateId: number;
  signature: string;
  verifiedAt?: string;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
};

export type LetterSignatureUpdatePayload = {
  letterSignatureTemplateId: number;
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
