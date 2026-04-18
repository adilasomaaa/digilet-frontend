import { http } from "@/lib/fetcher";
import type {
  StudentReport,
  StudentReportCreatePayload,
  StudentReportPaginatedResponse,
} from "@/models";

export const studentReportService = {
  async index(params?: any) {
    return await http<StudentReportPaginatedResponse>("student-report", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async show(id: number) {
    return await http<{ data: StudentReport }>(`student-report/${id}`, {
        method: "GET",
        auth: true,
    });
  },

  async create(payload: StudentReportCreatePayload) {
    const formData = new FormData();
    
    for (const key in payload) {
      const value = payload[key as keyof StudentReportCreatePayload];

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
    return await http<{ data: StudentReport, message: string }>("student-report", {
        method: "POST",
        auth: true,
        contentType: "formData",
        body: formData,
    });
  },

  async update(id: number, payload: StudentReportCreatePayload) {
      const formData = new FormData();
      
      for (const key in payload) {
        const value = payload[key as keyof StudentReportCreatePayload];

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
      return await http<{ data: StudentReport, message: string }>(`student-report/${id}`, {
          method: "PATCH",
          auth: true,
          contentType: "formData",
          body: formData,
      });
  },

  async delete(id: number) {
      return await http<{ message: string }>(`student-report/${id}`, {
          method: "DELETE",
          auth: true,
      });
  },

  async verify(id: number, payload: any) {
    return await http<{ message: string }>(`student-report/${id}/verify`, {
        method: "PATCH",
        auth: true,
        body: payload
    });
  },

  async exportExcel(params?: any) {
    const blob = await http<Blob>(`student-report/export`, {
      method: "GET",
      query: params,
      auth: true,
      responseType: "blob",
      toast: false,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-report-${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
