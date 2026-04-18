import { http } from "../lib/fetcher";
import type {
  Activity,
  ActivityCreatePayload,
  ActivityPaginatedResponse,
  ActivityUpdatePayload,
} from "@/models";

export const activityService = {
  async index(params?: any) {
    return await http<ActivityPaginatedResponse>("activity", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: ActivityCreatePayload) {
    return await http<{ data: Activity }>("activity", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: number) {
    return await http<{ data: Activity }>(`activity/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async update(id: number, payload: ActivityUpdatePayload) {
    return await http<{ data: Activity }>(`activity/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async delete(id: number) {
    return await http<{ data: Activity }>(`activity/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};