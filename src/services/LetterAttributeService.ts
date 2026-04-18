import { http } from "../lib/fetcher";
import type {
  LetterAttribute,
  LetterAttributeCreatePayload,
  LetterAttributePaginatedResponse,
  LetterAttributeUpdatePayload,
} from "@/models";

export const letterAttributeService = {
  async index(params?: any) {
    return await http<LetterAttributePaginatedResponse>("letter-attribute", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterAttributeCreatePayload) {
    const payloadData = {
      ...payload,
      type: "text",
    };
    return await http<{ data: LetterAttribute }>("letter-attribute", {
      method: "POST",
      auth: true,
      body: payloadData,
    });
  },

  async show(id: number) {
    return await http<{ data: LetterAttribute }>(`letter-attribute/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: LetterAttributeUpdatePayload) {
    const payloadData = {
      ...payload,
      type: "text",
    };
    return await http<{ data: LetterAttribute }>(`letter-attribute/${id}`, {
      method: "PATCH",
      auth: true,
      body: payloadData,
    });
  },

  async delete(id: number) {
    return await http<{ data: LetterAttribute }>(`letter-attribute/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
