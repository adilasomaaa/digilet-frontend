import type { DocumentSubmission } from "./document_submission";
import type { Institution } from "./institution";
import type { Letter } from "./letter";
import type { LetterAttributeSubmission } from "./letter_attribute_submission";
import type { Student } from "./student";

export type StudentLetter = {
  id: number;
  token: string;
  studentId: number;
  name: string;
  institutionId: number;
  letterId: number;
  letterNumber: string;
  status: string;
  letterDate: string;
  signatureType: string;
  student: Student;
  letter: Letter;
  carbonCopy: string;
  institution: Institution;
  documentSubmissions: DocumentSubmission[];
  letterAttributeSubmissions: LetterAttributeSubmission[];
  createdAt: string;
  updatedAt: string;
};

export type StudentLetterCreatePayload = {
  studentId: number;
};

export type StudentLetterUpdatePayload = {
  name: string;
};

export type StudentLetterCarbonCopyPayload = {
  carbonCopy: string;
}

export interface StudentLetterPaginatedResponse {
  data: StudentLetter[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
