import { z } from "zod";

export const institutionSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export type InstitutionSchema = z.infer<typeof institutionSchema>;
