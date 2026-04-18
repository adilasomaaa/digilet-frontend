import { z } from "zod";

export const studentSchema = z.object({
  fullname: z.string(),
  institutionId: z.any(),
  email: z.string(),
  address: z.string(),
  nim: z.string(),
  phoneNumber: z.string().optional(),
  birthday: z.any().optional(),
  birthplace: z.string().nullable().optional(),
  gender: z.string().max(10),
  classYear: z.string(),
});

export type StudentSchema = z.infer<typeof studentSchema>;
