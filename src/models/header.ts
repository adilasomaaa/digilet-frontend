import type { StudyProgram } from "./study_program";

export type Header = {
  id: number;
  studyProgramId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
  studyProgram: StudyProgram;
  createdAt: string;
  updatedAt: string;
};

export type HeaderCreatePayload = {
  studyProgramId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
};

export type HeaderUpdatePayload = {
  studyProgramId: number;
  name: string;
  header: string;
  subheader: string;
  address: string;
  logo: string;
};

export interface HeaderPaginatedResponse {
  data: Header[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
