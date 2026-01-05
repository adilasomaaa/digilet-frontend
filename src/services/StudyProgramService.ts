import type {
  StudyProgram,
  StudyProgramCreatePayload,
  StudyProgramPaginatedResponse,
  StudyProgramUpdatePayload,
} from "@/models";
import { http } from "../lib/fetcher";

export const studyProgramService = {
  async index(params?: any) {
    return await http<StudyProgramPaginatedResponse>("study-program", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async landing(params?: any) {
    return await http<StudyProgramPaginatedResponse>("study-program/landing", {
      method: "GET",
      query: params,
      auth: false,
    });
  },

  async create(payload: StudyProgramCreatePayload) {
    return await http<{ data: StudyProgram }>("study-program", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: StudyProgram }>(`study-program/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: StudyProgramUpdatePayload) {
    return await http<{ data: StudyProgram }>(`study-program/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: StudyProgram }>(`study-program/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
