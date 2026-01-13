import { http } from "../lib/fetcher";
import type {
  Header,
  HeaderCreatePayload,
  HeaderPaginatedResponse,
  HeaderUpdatePayload,
} from "@/models";

export const headerService = {
  async index(params?: any) {
    return await http<HeaderPaginatedResponse>("letterhead", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: HeaderCreatePayload) {
    const formData = new FormData();

    for (const key in payload) {
      const value = payload[key as keyof HeaderCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "logo") {
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
    return await http<{ data: Header }>("letterhead", {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  async show(id: number) {
    return await http<{ data: Header }>(`letterhead/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: HeaderUpdatePayload) {
    const formData = new FormData();

    for (const key in payload) {
      const value = payload[key as keyof HeaderCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "logo") {
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
    return await http<{ data: Header }>(`letterhead/${id}`, {
      method: "PATCH",
      auth: true,
      body: formData,
    });
  },

  async delete(id: number) {
    return await http<{ data: Header }>(`letterhead/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
