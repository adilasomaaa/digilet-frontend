import type { AuthResponse } from "./auth";

export type ActivityParticipant = {
  id: number;
  activityId: number;
  userId: number;
  isVerified: boolean;
  proofOfAttendance: string | null;
  createdAt: string;
  updatedAt: string;
  user?: AuthResponse;
};

export type ActivityParticipantCreatePayload = {
  activityId: number;
  userId: number;
  isVerified?: boolean;
};

export type ActivityParticipantUpdatePayload = {
  isVerified?: boolean;
};

export interface ActivityParticipantPaginatedResponse {
  data: ActivityParticipant[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}