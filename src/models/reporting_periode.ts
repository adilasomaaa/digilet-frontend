import type { UserResponse } from "./auth";
import type { Institution } from "./institution";
import type { ReportingStage } from "./reporting_stage";

export type ReportingPeriode = {
  id: number;
  name: string;
  description?: string;
  targetUser: string;
  scope: string;
  institutionId: number;
  institution: Institution;
  userId: number;
  user: UserResponse;
  reportingStages?: ReportingStage[];
  createdAt: string;
  updatedAt: string;
};

export type ReportingPeriodeCreatePayload = {
  name: string;
  description?: string;
  targetUser: string;
  scope: string;
};

export type ReportingPeriodeUpdatePayload = {
  name: string;
  description?: string;
  targetUser: string;
  scope: string;
};

export interface ReportingPeriodePaginatedResponse {
  data: ReportingPeriode[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}