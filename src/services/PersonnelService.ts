import { http } from "../lib/fetcher";
import type {
  Personnel,
  PersonnelCreatePayload,
  PersonnelPaginatedResponse,
  PersonnelUpdatePayload,
} from "@/models";

export const personnelService = {
  async index(params?: any) {
    return await http<PersonnelPaginatedResponse>("personnel", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: PersonnelCreatePayload) {
    return await http<{ data: Personnel }>("personnel", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Personnel }>(`personnel/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: PersonnelUpdatePayload) {
    return await http<{ data: Personnel }>(`personnel/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Personnel }>(`personnel/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};