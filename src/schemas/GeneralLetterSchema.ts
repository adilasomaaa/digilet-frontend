import { z } from "zod";

export const generalLetterSchema = z.object({
  name: z.string(),
});

export type GeneralLetterSchema = z.infer<typeof generalLetterSchema>;