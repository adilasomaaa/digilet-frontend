import { z } from "zod";

export const letterAttributeSchema = z.object({
  attributeName: z.string(),
  placeholder: z.string(),
  label: z.string(),
  isRequired: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
  isVisible: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
  isEditable: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
});

export type LetterAttributeSchema = z.infer<typeof letterAttributeSchema>;
