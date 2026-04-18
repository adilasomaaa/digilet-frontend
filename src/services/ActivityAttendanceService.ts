import { http } from "@/lib/fetcher";

export const activityAttendanceService = {
  getByCode: async (uniqueCode: string) => {
    return await http<any>(`/api/activity/code/${uniqueCode}`, {
      method: "GET",
      auth: false,
    });
  },

  validateParticipant: async (uniqueCode: string, identifier: string) => {
    return await http<any>(`/api/activity-participant/validate-participant/${uniqueCode}?identifier=${identifier}`, {
      method: "GET",
      auth: false,
    });
  },

  checkLocation: async (uniqueCode: string, latitude: number, longitude: number) => {
    return await http<any>(`/api/activity-participant/check-location/${uniqueCode}?latitude=${latitude}&longitude=${longitude}`, {
      method: "GET",
      auth: false,
    });
  },

  submitAttendance: async (uniqueCode: string, data: FormData) => {
    return await http<any>(`/api/activity-participant/attend/${uniqueCode}`, {
      method: "POST",
      body: data,
      contentType: "formData",
      auth: false,
    });
  },
};
