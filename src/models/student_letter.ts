import type { UserResponse } from "./auth";
import type { Institution } from "./institution";
import type { Letter } from "./letter";
import type { LetterAttributeSubmission } from "./letter_attribute_submission";
import type { LetterDocument } from "./letter_document";
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
  institution: Institution;
  letterDocument: LetterDocument[];
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

export interface StudentLetterPaginatedResponse {
  data: StudentLetter[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
