import { http } from "../lib/fetcher";
import type {
  ReportingStage,
  ReportingStageCreatePayload,
  ReportingStagePaginatedResponse,
  ReportingStageUpdatePayload,
} from "@/models";

export const reportingStageService = {
  async index(params?: any) {
    return await http<ReportingStagePaginatedResponse>("reporting-stage", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: ReportingStageCreatePayload) {
    return await http<{ data: ReportingStage }>("reporting-stage", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: ReportingStage }>(`reporting-stage/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: ReportingStageUpdatePayload) {
    return await http<{ data: ReportingStage }>(`reporting-stage/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: ReportingStage }>(`reporting-stage/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};