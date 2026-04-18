import { z } from "zod";

export const activityAttendanceSchema = z.object({
  identifier: z.string().min(3, "NIM/NIP minimal 3 karakter"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  proofOfAttendance: z.any().optional(),
});

export type ActivityAttendanceSchema = z.infer<typeof activityAttendanceSchema>;
