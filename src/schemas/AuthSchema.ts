import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  remember: z.boolean().optional(),
});
export type LoginSchema = z.infer<typeof loginSchema>;
