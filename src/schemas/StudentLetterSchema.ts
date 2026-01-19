import { z } from "zod";

export const studentLetterSchema = z.object({
  name: z.string(),
});

export type StudentLetterSchema = z.infer<typeof studentLetterSchema>;