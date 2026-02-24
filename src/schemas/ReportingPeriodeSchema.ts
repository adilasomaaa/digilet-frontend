import { z } from "zod";

export const reportingPeriodeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  targetUser: z.string(),
  scope: z.string(),
  institutionId: z.number(),
});

export type ReportingPeriodeSchema = z.infer<typeof reportingPeriodeSchema>;