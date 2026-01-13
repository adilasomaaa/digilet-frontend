import { z } from "zod";

export const officialSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  nip: z.string(),
  institutionId: z.any().optional(),
});

export type OfficialSchema = z.infer<typeof officialSchema>;
