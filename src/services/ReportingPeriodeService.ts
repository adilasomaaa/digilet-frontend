import { http } from "../lib/fetcher";
import type {
  ReportingPeriode,
  ReportingPeriodeCreatePayload,
  ReportingPeriodePaginatedResponse,
  ReportingPeriodeUpdatePayload,
} from "@/models";

export const reportingPeriodeService = {
  async index(params?: any) {
    return await http<ReportingPeriodePaginatedResponse>("reporting-periode", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: ReportingPeriodeCreatePayload) {
    return await http<{ data: ReportingPeriode }>("reporting-periode", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: ReportingPeriode }>(`reporting-periode/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: ReportingPeriodeUpdatePayload) {
    return await http<{ data: ReportingPeriode }>(`reporting-periode/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: ReportingPeriode }>(`reporting-periode/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};