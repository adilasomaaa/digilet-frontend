import type { ReportingPeriode } from "./reporting_periode";

export type ReportingStage = {
  id: number;
  stageName: string;
  stageOrder: number;
  reportingPeriodeId: number;
  reportingPeriode: ReportingPeriode
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportingStageCreatePayload = {
  stageName: string;
  reportingPeriodeId: number;
  startDate: string;
  endDate: string;
};

export type ReportingStageUpdatePayload = {
  stageName: string;
  reportingPeriodeId: number;
  startDate: string;
  endDate: string;
};

export interface ReportingStagePaginatedResponse {
  data: ReportingStage[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}