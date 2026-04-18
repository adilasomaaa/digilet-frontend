import { z } from "zod";

export const headerSchema = z.object({
  name: z.string(),
  header: z.string(),
  subheader: z.string(),
  address: z.string(),
  logo: z.any(),
  institutionId: z.number().optional(),
});

export type HeaderSchema = z.infer<typeof headerSchema>;
