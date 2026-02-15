import { http } from "../lib/fetcher";
import type {
  Official,
  OfficialCreatePayload,
  OfficialPaginatedResponse,
  OfficialUpdatePayload,
} from "@/models";

export const officialService = {
  async index(params?: any) {
    return await http<OfficialPaginatedResponse>("official", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async export(params?: any) {
    return await http<Blob>("official/export/excel", {
      method: "GET",
      query: params,
      auth: true,
      responseType: "blob",
    });
  },

  async import(file: File, institutionId: number) {
    const formData = new FormData();
    formData.append("file", file);

    return await http<any>("official/import", {
      method: "POST",
      auth: true,
      contentType: "formData",
      body: formData,
      query: { institutionId },
    });
  },

  async create(payload: OfficialCreatePayload) {
    return await http<{ data: Official }>("official", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Official }>(`official/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: OfficialUpdatePayload) {
    return await http<{ data: Official }>(`official/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Official }>(`official/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};