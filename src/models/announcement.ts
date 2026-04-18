import type { UserResponse } from "./auth";
import type { Institution } from "./institution";

export type Announcement = {
  id: number;
  content: string;
  visibleAt: string;
  status: boolean;
  institutionId: number;
  userId: number;
  file: string;
  institution: Institution;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementCreatePayload = {
  content: string;
  visibleAt: string;
  status: string;
  file:  string | FileList;
};

export type AnnouncementUpdatePayload = {
  content: string;
  visibleAt: string;
  status: string;
  file:  string | FileList;
};

export interface AnnouncementPaginatedResponse {
  data: Announcement[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}