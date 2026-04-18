import { z } from "zod";

export const activityParticipantSchema = z.object({
  activityId: z.number(),
  userId: z.number(),
  isVerified: z.boolean().optional(),
});

export type ActivityParticipantSchema = z.infer<typeof activityParticipantSchema>;