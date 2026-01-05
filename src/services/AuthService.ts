import { http } from "../lib/fetcher";
import type { AuthResponse, LoginPayload, LoginResponse } from "../models";

export const authService = {
  async login(payload: LoginPayload) {
    return await http<{ data: LoginResponse }>("auth/login", {
      method: "POST",
      auth: false,
      body: payload,
    }).then((res) => {
      const { data } = res;
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    });
  },

  me(tokenOverride?: string) {
    return http<{ data: AuthResponse }>("auth/me", {
      auth: true,
      headers: tokenOverride
        ? { Authorization: `Bearer ${tokenOverride}` }
        : undefined,
    });
  },

  async logout() {
    try {
      await http<void>("auth/logout", {
        method: "POST",
        auth: true,
      });
    } catch {
    } finally {
      localStorage.removeItem("access_token");
    }
  },
};
