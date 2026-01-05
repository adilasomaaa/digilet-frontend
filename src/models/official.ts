import type { StudyProgram } from "./study_program";

export type Official = {
  id: number;
  name: string;
  studyProgramId?: number;
  occupation: string;
  nip: string;
  studyProgram?: StudyProgram | null;
  createdAt: string;
  updatedAt: string;
};

export type OfficialCreatePayload = {
  name: string;
  studyProgramId?: number;
  occupation: string;
  nip: string;
};

export type OfficialUpdatePayload = {
  name: string;
  studyProgramId?: number;
  occupation: string;
  nip: string;
};

export interface OfficialPaginatedResponse {
  data: Official[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
