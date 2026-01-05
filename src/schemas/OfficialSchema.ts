import { z } from "zod";

export const officialSchema = z.object({
  name: z.string(),
  studyProgramId: z.any().optional(),
  occupation: z.string(),
  nip: z.string(),
});

export type OfficialSchema = z.infer<typeof officialSchema>;
