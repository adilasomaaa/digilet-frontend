import { z } from "zod";

export const letterAttachmentSchema = z.object({
  name: z.string(),
});

export type LetterAttachmentSchema = z.infer<typeof letterAttachmentSchema>;