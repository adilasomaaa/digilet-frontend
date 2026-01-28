import { http } from "../lib/fetcher";
import type {
  LetterAttachment,
  LetterAttachmentCreatePayload,
  LetterAttachmentPaginatedResponse,
  LetterAttachmentUpdatePayload,
} from "@/models";

export const letterAttachmentService = {
  async index(params?: any) {
    return await http<LetterAttachmentPaginatedResponse>("letter-attachment", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterAttachmentCreatePayload) {
    return await http<{ data: LetterAttachment }>("letter-attachment", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async upsert(payload: LetterAttachmentCreatePayload) {
    return await http<{ data: LetterAttachment }>("letter-attachment/upsert", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: LetterAttachment }>(`letter-attachment/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterAttachmentUpdatePayload) {
    return await http<{ data: LetterAttachment }>(`letter-attachment/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: LetterAttachment }>(`letter-attachment/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};