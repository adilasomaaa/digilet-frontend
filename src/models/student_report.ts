import type { ReportingStage } from "./reporting_stage";
import type { Student } from "./student";
import type { Official } from "./official";

export type StudentReport = {
  id: number;
  reportingStageId: number;
  reportingStage: ReportingStage;
  studentId: number;
  student: Student;
  officialId: number;
  official: Official;
  content: string;
  documentProved?: string;
  notes?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentReportCreatePayload = {
  reportingStageId: number;
  officialId: number;
  content: string;
  documentProved?: string | FileList;
};

export type StudentReportUpdatePayload = {
  content?: string;
  documentProved?: string;
};

export interface StudentReportPaginatedResponse {
  data: StudentReport[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
