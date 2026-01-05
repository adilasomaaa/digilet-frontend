import { z } from "zod";

export const personnelSchema = z.object({
  name: z.string(),
  position: z.string(),
  email: z.string().email(),
  studyProgramId: z.any().optional(),
});

export type PersonnelSchema = z.infer<typeof personnelSchema>;
