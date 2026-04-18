export type LetterAttachment = {
  id: number;
  studentLetterSubmissionId: number;
  generalLetterSubmissionId: number;
  isVisible:boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type LetterAttachmentCreatePayload = {
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
  isVisible:boolean;
  content: string;
};

export type LetterAttachmentUpdatePayload = {
  studentLetterSubmissionId?: number;
  generalLetterSubmissionId?: number;
  isVisible:boolean;
  content: string;
};

export interface LetterAttachmentPaginatedResponse {
  data: LetterAttachment[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}