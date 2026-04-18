import { z } from "zod";

export const activitySchema = z.object({
  activityName: z.string(),
  description: z.string().optional().nullable(),
  implementationDate: z.any(),
  location: z.string().optional().nullable(),
  coordinates: z.string().optional().nullable(),
  target: z.enum(['student', 'lecturer']),
  category: z.enum(['faculty', 'study_program']),
});

export type ActivitySchema = z.infer<typeof activitySchema>;