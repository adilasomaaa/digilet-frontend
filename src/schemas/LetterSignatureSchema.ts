import { z } from "zod";

export const letterSignatureSchema = z.object({
  officialId: z.any(),
  position: z.string(),
  occupation: z.string(),
  uniqueCode: z.string(),
  isAcknowledged: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
});

export type LetterSignatureSchema = z.infer<
  typeof letterSignatureSchema
>;
