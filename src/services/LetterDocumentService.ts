import { http } from "../lib/fetcher";
import type {
  LetterDocument,
  LetterDocumentCreatePayload,
  LetterDocumentPaginatedResponse,
  LetterDocumentUpdatePayload,
} from "@/models";

export const letterDocumentService = {
  async index(params?: any) {
    return await http<LetterDocumentPaginatedResponse>("letter-document", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterDocumentCreatePayload) {
    return await http<{ data: LetterDocument }>("letter-document", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: LetterDocument }>(`letter-document/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterDocumentUpdatePayload) {
    return await http<{ data: LetterDocument }>(`letter-document/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: LetterDocument }>(`letter-document/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};