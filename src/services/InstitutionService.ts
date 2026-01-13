import type {
  Institution,
  InstitutionCreatePayload,
  InstitutionPaginatedResponse,
  InstitutionUpdatePayload,
} from "@/models";
import { http } from "../lib/fetcher";

export const institutionService = {
  async index(params?: any) {
    return await http<InstitutionPaginatedResponse>("institution", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async landing(params?: any) {
    return await http<InstitutionPaginatedResponse>("institution/landing", {
      method: "GET",
      query: params,
      auth: false,
    });
  },

  async create(payload: InstitutionCreatePayload) {
    return await http<{ data: Institution }>("institution", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Institution }>(`institution/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: InstitutionUpdatePayload) {
    return await http<{ data: Institution }>(`institution/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Institution }>(`institution/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
