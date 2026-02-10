import { z } from "zod";

export const institutionSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  type: z.enum(["university", "faculty", "study_program", "institution"]),
  parentId: z.number().nullable().optional(),
});

export type InstitutionSchema = z.infer<typeof institutionSchema>;
