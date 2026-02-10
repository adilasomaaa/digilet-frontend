import { z } from "zod";

export const announcementSchema = z.object({
  content: z.string(),
  visibleAt: z.string(),
  status: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
  file: z.any().optional(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;