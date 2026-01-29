import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid"),
  occupation: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru tidak cocok",
    path: ["confirmPassword"],
  });
