import type { Official } from "./official";
import type { ReportingStage } from "./reporting_stage";

export interface LecturerReport {
  id: number;
  reportingStageId: number;
  reportingStage: ReportingStage;
  reporterId: number;
  reporter: Official;
  validatorId: number;
  validator: Official;
  content: string;
  documentProved: string | null;
  notes: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type LecturerReportCreatePayload = {
  reportingStageId: number;
  officialId: number;
  content: string;
  documentProved?: string | FileList;
};

export type LecturerReportUpdatePayload = {
  content?: string;
  documentProved?: string;
};

export interface LecturerReportPaginatedResponse {
  data: LecturerReport[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
