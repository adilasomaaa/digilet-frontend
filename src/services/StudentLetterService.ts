import { http } from "../lib/fetcher";
import type {
  StudentLetter,
  StudentLetterCreatePayload,
  StudentLetterPaginatedResponse,
  StudentLetterUpdatePayload,
} from "@/models";

export const studentLetterService = {
  async index(params?: any) {
    return await http<StudentLetterPaginatedResponse>("student-letter", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: StudentLetterCreatePayload) {
    return await http<{ data: StudentLetter }>("student-letter", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: StudentLetter }>(`student-letter/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: StudentLetterUpdatePayload) {
    return await http<{ data: StudentLetter }>(`student-letter/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: StudentLetter }>(`student-letter/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};