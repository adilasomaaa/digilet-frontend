import { http } from "../lib/fetcher";
import type {
  GeneralLetter,
  GeneralLetterCreatePayload,
  GeneralLetterPaginatedResponse,
  GeneralLetterUpdatePayload,
} from "@/models";

export const generalLetterService = {
  async index(params?: any) {
    return await http<GeneralLetterPaginatedResponse>(
      "general-letter-submission",
      {
        method: "GET",
        query: params,
        auth: true,
      }
    );
  },

  async create(payload: GeneralLetterCreatePayload) {
    return await http<{ data: GeneralLetter }>("general-letter-submission", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: GeneralLetter }>(
      `general-letter-submission/${id}`,
      {
        method: "GET",
        auth: true,
      }
    );
  },

  async update(id: number, payload: GeneralLetterUpdatePayload) {
    return await http<{ data: GeneralLetter }>(
      `general-letter-submission/${id}`,
      {
        method: "PATCH",
        auth: true,
        body: payload,
      }
    );
  },

  async delete(id: number) {
    return await http<{ data: GeneralLetter }>(
      `general-letter-submission/${id}`,
      {
        method: "DELETE",
        auth: true,
      }
    );
  },
};
