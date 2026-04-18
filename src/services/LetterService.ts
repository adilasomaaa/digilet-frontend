import { http } from "../lib/fetcher";
import type {
  Letter,
  LetterCreatePayload,
  LetterPaginatedResponse,
  LetterUpdatePayload,
} from "@/models";

export const letterService = {
  async index(params?: any) {
    return await http<LetterPaginatedResponse>("letter", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterCreatePayload) {
    return await http<{ data: Letter }>("letter", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Letter }>(`letter/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterUpdatePayload) {
    return await http<{ data: Letter }>(`letter/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Letter }>(`letter/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};