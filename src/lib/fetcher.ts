import { addToast } from "@heroui/react";
import { env } from "./env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ContentType = "json" | "formData";

type FetcherOptions = {
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  credentials?: RequestCredentials;
  toast?: boolean;
  baseUrl?: string;
  contentType?: ContentType;
  responseType?: "json" | "blob";
};

const BASE_URL = env.apiUrl;

export async function http<T>(
  path: string,
  {
    method = "GET",
    query,
    body,
    headers = {},
    auth = true,
    credentials,
    toast = true,
    baseUrl,
    contentType = "json",
    responseType = "json",
  }: FetcherOptions = {}
): Promise<T> {
  const url = new URL(path, baseUrl ?? BASE_URL);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }

  const token = auth ? localStorage.getItem("token") : null;

  const shouldSendFormData =
    contentType === "formData" || body instanceof FormData;

  let res: Response | null = null;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        ...(!shouldSendFormData && { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: shouldSendFormData
        ? (body as FormData)
        : body
        ? JSON.stringify(body)
        : undefined,
      credentials,
    });

    const contentTypeHeader = res.headers.get("content-type") || "";
    const isJson = contentTypeHeader.includes("application/json");
    const data = (isJson ? await res.json() : undefined) as any;

    if (!res.ok) {
      const message =
        (data && (data.message || data.error || data.detail)) ||
        res.statusText ||
        "Request failed";

      throw new Error(message);
    }

    if (responseType === "blob") {
      return (await res.blob()) as unknown as T;
    }

    if (toast && method !== "GET") {
      addToast({
        title: "Berhasil",
        description: (data && (data.message as string)) || "Success",
        closeIcon: true,
      });
    }

    return data as T;
  } catch (err: any) {
    if (toast && method !== "GET") {
      addToast({
        title: "Gagal",
        description: err?.message ?? "Terjadi kesalahan jaringan",
        color: "danger",
        closeIcon: true,
      });
    }
    throw err;
  }
}
