import { z } from "zod";

export const letterSignatureTemplateSchema = z.object({
  name: z.string(),
});

export type LetterSignatureTemplateSchema = z.infer<typeof letterSignatureTemplateSchema>;