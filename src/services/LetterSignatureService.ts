import type {
  LetterSignature,
  LetterSignatureCreatePayload,
  LetterSignaturePaginatedResponse,
  LetterSignatureUpdatePayload,
} from "@/models/letter_signature";
import { http } from "../lib/fetcher";

export const letterSignatureService = {
  async index(params?: any) {
    return await http<LetterSignaturePaginatedResponse>("letter-signature", {
      method: "GET",
      query: params,
      auth: true,
    });
  },

  async create(payload: LetterSignatureCreatePayload) {
    return await http<{ data: LetterSignature }>("letter-signature", {
      method: "POST",
      auth: true,
      body: payload,
    });
  },

  async show(id: string) {
    return await http<{ data: LetterSignature }>(`letter-signature/${id}`, {
      method: "GET",
      auth: true,
    });
  },

  async findByToken(token: string) {
    return await http<{ data: LetterSignature }>(
      `letter-signature/find-by-token/${token}`,
      {
        method: "GET",
        auth: true,
      },
    );
  },

  async update(id: number, payload: LetterSignatureUpdatePayload) {
    return await http<{ data: LetterSignature }>(`letter-signature/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  async reset(id: number) {
    return await http<{ data: LetterSignature }>(
      `letter-signature/reset/${id}`,
      {
        method: "PATCH",
        auth: true,
      },
    );
  },

  async delete(id: number) {
    return await http<{ data: LetterSignature }>(`letter-signature/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
