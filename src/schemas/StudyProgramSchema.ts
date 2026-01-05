import { z } from "zod";

export const studyProgramSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export type StudyProgramSchema = z.infer<typeof studyProgramSchema>;
