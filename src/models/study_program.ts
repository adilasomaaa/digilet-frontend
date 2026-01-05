export type StudyProgram = {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type StudyProgramCreatePayload = {
  name: string;
  address: string;
};

export type StudyProgramUpdatePayload = {
  name: string;
  address: string;
};

export interface StudyProgramPaginatedResponse {
  data: StudyProgram[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
