import { http } from "../lib/fetcher";
import type {
  ActivityParticipant,
  ActivityParticipantCreatePayload,
  ActivityParticipantPaginatedResponse,
  ActivityParticipantUpdatePayload,
} from "@/models";

export const activityParticipantService = {
  async index(params?: any) {
    return await http<ActivityParticipantPaginatedResponse>("activity-participant", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: ActivityParticipantCreatePayload) {
    return await http<{ data: ActivityParticipant }>("activity-participant", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: ActivityParticipant }>(`activity-participant/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: ActivityParticipantUpdatePayload) {
    return await http<{ data: ActivityParticipant }>(`activity-participant/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: ActivityParticipant }>(`activity-participant/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },

  async verify(id: number) {
    return await http<{ data: any }>(`activity-participant/${id}/verify`, {
      method: "PATCH",
      auth: true,
    });
  },

  async verifyBulk(ids: number[]) {
    return await http<{ data: any }>(`activity-participant/verify-bulk`, {
      method: "POST",
      auth: true,
      body: { ids },
    });
  },

  async exportExcel(activityId: number) {
    const blob = await http<Blob>(`activity-participant/export/excel/${activityId}`, {
      method: "GET",
      auth: true,
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peserta-kegiatan-${activityId}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async exportPdf(activityId: number) {
    const blob = await http<Blob>(`activity-participant/export/pdf/${activityId}`, {
      method: "GET",
      auth: true,
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peserta-kegiatan-${activityId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  },

  async myActivities(params?: any) {
    return await http<ActivityParticipantPaginatedResponse>("activity-participant/my/activities", {
      method: "GET",
      query: params,
      auth: true,
    });
  },
};