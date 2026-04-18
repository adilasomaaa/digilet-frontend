import type { LetterAttribute } from "./letter_attribute";

export type LetterAttributeSubmission = {
  id: number;
  letterAttributeId: number;
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
  content: string;
  letterAttribute: LetterAttribute;
  createdAt: string;
  updatedAt: string;
};
