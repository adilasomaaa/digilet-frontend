import type { UserResponse } from "./auth";
import type { StudyProgram } from "./study_program";

export type Personnel = {
  id: number;
  name: string;
  position: string;
  studyProgramId: number;
  userId: number;
  studyProgram: StudyProgram;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
};

export type PersonnelCreatePayload = {
  name: string;
  email: string;
  position: string;
  studyProgramId: number;
};

export type PersonnelUpdatePayload = {
  name: string;
  email: string;
  position: string;
  studyProgramId: number;
};

export interface PersonnelPaginatedResponse {
  data: Personnel[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
