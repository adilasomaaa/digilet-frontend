import { http } from "../lib/fetcher";
import type {
  Student,
  StudentCreatePayload,
  StudentPaginatedResponse,
  StudentUpdatePayload,
} from "@/models";

export const studentService = {
  async index(params?: any) {
    return await http<StudentPaginatedResponse>("student", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async export(params?: any) {
    return await http<Blob>("student/export/excel", {
      method: "GET",
      query: params,
      auth: true,
      responseType: "blob", // ✨ Penting agar file tidak rusak
    });
  },

  async import(file: File, studyProgramId: number) {
    const formData = new FormData();
    formData.append("file", file); // ✨ Nama 'file' sesuai controller

    return await http<any>("student/import", {
      method: "POST",
      auth: true,
      contentType: "formData", // ✨ Beritahu fetcher untuk tidak mengirim JSON
      body: formData,
      query: { studyProgramId }, // ✨ Kirim prodiId sebagai query
    });
  },

  async create(payload: StudentCreatePayload) {
    return await http<{ data: Student }>("student", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Student }>(`student/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: StudentUpdatePayload) {
    return await http<{ data: Student }>(`student/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Student }>(`student/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
