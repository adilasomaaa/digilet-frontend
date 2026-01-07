import { http } from "../lib/fetcher";
import type {
  LetterSignatureTemplate,
  LetterSignatureTemplateCreatePayload,
  LetterSignatureTemplatePaginatedResponse,
  LetterSignatureTemplateUpdatePayload,
} from "@/models";

export const letterSignatureTemplateService = {
  async index(params?: any) {
    return await http<LetterSignatureTemplatePaginatedResponse>("letter-signature-template", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterSignatureTemplateCreatePayload) {
    return await http<{ data: LetterSignatureTemplate }>("letter-signature-template", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: LetterSignatureTemplate }>(`letter-signature-template/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterSignatureTemplateUpdatePayload) {
    return await http<{ data: LetterSignatureTemplate }>(`letter-signature-template/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: LetterSignatureTemplate }>(`letter-signature-template/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};