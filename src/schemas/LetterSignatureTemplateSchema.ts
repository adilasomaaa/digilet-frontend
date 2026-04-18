import { z } from "zod";

export const letterSignatureTemplateSchema = z.object({
  officialId: z.any(),
  position: z.string(),
  isAcknowledged: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
});

export type LetterSignatureTemplateSchema = z.infer<
  typeof letterSignatureTemplateSchema
>;
