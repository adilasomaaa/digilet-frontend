export type Activity = {
  id: number;
  activityName: string;
  uniqueCode: string;
  description?: string | null;
  implementationDate: string;
  location?: string | null;
  coordinates?: string | null;
  target: 'student' | 'lecturer';
  category: 'faculty' | 'study_program';
  createdAt: string;
  updatedAt: string;
};

export type ActivityCreatePayload = Omit<Activity, 'id' | 'uniqueCode' | 'createdAt' | 'updatedAt'>;

export type ActivityUpdatePayload = Partial<ActivityCreatePayload>;

export interface ActivityPaginatedResponse {
  data: Activity[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}