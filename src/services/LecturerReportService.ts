import { http } from "@/lib/fetcher";
import type {
  LecturerReport,
  LecturerReportCreatePayload,
  LecturerReportPaginatedResponse,
} from "@/models";

export const lecturerReportService = {
  async index(params?: any) {
    return await http<LecturerReportPaginatedResponse>("lecturer-report", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async show(id: number) {
    return await http<{ data: LecturerReport }>(`lecturer-report/${id}`, {
        method: "GET",
        auth: true,
    });
  },

  async getReportsToVerify(params?: any) {
    return await http<LecturerReportPaginatedResponse>("lecturer-report/to-verify", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LecturerReportCreatePayload) {
    const formData = new FormData();
        
    for (const key in payload) {
      const value = payload[key as keyof LecturerReportCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "documentProved") {
        if (value instanceof FileList) {
          const file = value.length > 0 ? value[0] : null;

          if (file) {
            formData.append(key, file);
          } else {
            formData.append(key, "");
          }
        } else {
          formData.append(key, String(value));
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, String(item)));
      } else {
        formData.append(key, String(value));
      }
    }
    return await http<{ data: LecturerReport, message: string }>("lecturer-report", {
        method: "POST",
        auth: true,
        contentType: "formData",
        body: formData,
    });
  },

  async update(id: number, payload: LecturerReportCreatePayload) {
    const formData = new FormData();
        
    for (const key in payload) {
      const value = payload[key as keyof LecturerReportCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "documentProved") {
        if (value instanceof FileList) {
          const file = value.length > 0 ? value[0] : null;

          if (file) {
            formData.append(key, file);
          } else {
            formData.append(key, "");
          }
        } else {
          formData.append(key, String(value));
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, String(item)));
      } else {
        formData.append(key, String(value));
      }
    }
    return await http<{ data: LecturerReport, message: string }>(`lecturer-report/${id}`, {
        method: "PATCH",
        auth: true,
        contentType: "formData",
        body: formData,
    });
  },

  async verify(id: number, payload: { notes?: string, isVerified?: boolean }) {
       return await http<{ message: string }>(`lecturer-report/${id}/verify`, {
          method: "PATCH",
          auth: true,
          body: payload,
      });
  },

  async delete(id: number) {
      return await http<{ message: string }>(`lecturer-report/${id}`, {
          method: "DELETE",
          auth: true,
      });
  },

  async exportExcel(params?: any) {
    const blob = await http<Blob>(`lecturer-report/export`, {
      method: "GET",
      query: params,
      auth: true,
      responseType: "blob",
      toast: false,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lecturer-report-${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
