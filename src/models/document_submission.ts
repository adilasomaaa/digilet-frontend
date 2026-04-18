
import type { LetterDocument } from "./letter_document";
import type { StudentLetter } from "./student_letter";

export type DocumentSubmission = {
  id: number;
  studentLetterSubmissionId: number;
  letterDocumentId: number;
  file: string;
  filePath: string;
  studentLetterSubmission: StudentLetter;
  letterDocument: LetterDocument;
  createdAt: string;
  updatedAt: string;
};

export type DocumentSubmissionCreatePayload = {
  studentLetterSubmissionId: number;
  letterDocumentId: number;
  file: string;
};

export type DocumentSubmissionUpdatePayload = {
  studentLetterSubmissionId: number;
  letterDocumentId: number;
  file: string;
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
