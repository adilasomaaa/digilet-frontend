import { http } from "../lib/fetcher";
import type {
  LetterTemplate,
  LetterTemplateCreatePayload,
  LetterTemplatePaginatedResponse,
  LetterTemplateUpdatePayload,
} from "@/models";

export const letterTemplateService = {
  async index(params?: any) {
    return await http<LetterTemplatePaginatedResponse>("letter-template", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterTemplateCreatePayload) {
    return await http<{ data: LetterTemplate }>("letter-template", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async upsert(payload: LetterTemplateCreatePayload) {
    return await http<{ data: LetterTemplate }>("letter-template/upsert", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: LetterTemplate }>(`letter-template/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterTemplateUpdatePayload) {
    return await http<{ data: LetterTemplate }>(`letter-template/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: LetterTemplate }>(`letter-template/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
