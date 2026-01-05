import type { UserResponse } from "./auth";
import type { StudyProgram } from "./study_program";

export type Student = {
  id: number;
  fullname: string;
  studyProgramId: number;
  studyProgram: StudyProgram;
  userId: number;
  user: UserResponse;
  address: string;
  nim: string;
  phoneNumber: string;
  birthday?: string | null;
  birthplace?: string | null;
  gender: string;
  classYear: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentCreatePayload = {
  fullname: string;
  studyProgramId: number;
  email: string;
  address: string;
  nim: string;
  classYear: string;
  phoneNumber?: string;
  birthday?: string;
  birthplace?: string;
  gender: string;
};

export type StudentUpdatePayload = {
  fullname: string;
  studyProgramId: number;
  email: string;
  address: string;
  nim: string;
  classYear: string;
  phoneNumber?: string;
  birthday?: string;
  birthplace?: string;
  gender: string;
};

export interface StudentPaginatedResponse {
  data: Student[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
