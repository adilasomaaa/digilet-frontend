import { z } from "zod";

export const letterTemplateSchema = z.object({
  content: z.any(),
});

export type LetterTemplateSchema = z.infer<typeof letterTemplateSchema>;
