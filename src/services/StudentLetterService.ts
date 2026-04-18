import { http } from "../lib/fetcher";
import type {
  StudentLetter,
  StudentLetterPaginatedResponse,
} from "@/models";

export const studentLetterService = {
  async index(params?: any) {
    return await http<StudentLetterPaginatedResponse>("student-letter-submission", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: FormData) {
    return await http<{ data: StudentLetter }>(
      "student-letter-submission",
      {
        method: "POST",
        auth: true,
        body: payload,
      }
    );
  },

  async show(id: number) {
    return await http<{ data: StudentLetter }>(`student-letter-submission/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async updateCarbonCopy(id: number, payload: any) {
    return await http<{ data: StudentLetter }>(`student-letter-submission/${id}/carbon-copy`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async update(id: number, payload: any) {
    return await http<{ data: StudentLetter }>(`student-letter-submission/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async print(id: number) {
    const response = await http<{data: any}>(`/api/student-letter-submission/${id}/print`, { method: "GET" });
    return response.data;
  },

  async printPdf(id: number) {
    // Return the URL for the PDF
    return `${import.meta.env.VITE_API_URL}/api/student-letter-submission/${id}/print-pdf`;
  },

  async changeStatus(id: number, status: string) {
    const response = await http<{data: any}>(`/api/student-letter-submission/${id}/change-status`, { 
        method: "PATCH",
        body: { status }
    });
    return response.data;
  },

  async verify(id: number, payload: any) {
    return await http<{ data: StudentLetter }>(`student-letter-submission/${id}/verify`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: StudentLetter }>(`student-letter-submission/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },

  async getLetterData(token: string) {
    return await http<{ data: any }>(`student-letter-submission/letter-data/${token}`, {
      method: "GET",
      auth: false,
    });
  },
};