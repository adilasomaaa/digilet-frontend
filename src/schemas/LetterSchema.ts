import { z } from "zod";

export const letterSchema = z.object({
  letterName: z.string(),
  letterHeadId: z.any(),
  referenceNumber: z.string(),
  expiredDate: z.any(),
  letterNumberingStart: z.any(),
  category: z.string(),
});

export type LetterSchema = z.infer<typeof letterSchema>;
