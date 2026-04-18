import { http } from "../lib/fetcher";
import type {
  Announcement,
  AnnouncementCreatePayload,
  AnnouncementPaginatedResponse,
  AnnouncementUpdatePayload,
} from "@/models";

export const announcementService = {
  async index(params?: any) {
    return await http<AnnouncementPaginatedResponse>("announcement", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: AnnouncementCreatePayload) {
    const formData = new FormData();
    
    for (const key in payload) {
      const value = payload[key as keyof AnnouncementCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "file") {
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
    return await http<{ data: Announcement }>("announcement", {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  async show(id: number) {
    return await http<{ data: Announcement }>(`announcement/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: AnnouncementUpdatePayload) {
    const formData = new FormData();
    
    for (const key in payload) {
      const value = payload[key as keyof AnnouncementCreatePayload];

      if (value === null || value === undefined) {
        continue;
      }

      if (key === "file") {
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

    return await http<{ data: Announcement }>(`announcement/${id}`, {
      method: "PATCH",
      auth: true,
      body: formData,
    });
  },

  async delete(id: number) {
    return await http<{ data: Announcement }>(`announcement/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};