import { z } from "zod";

export const letterDocumentSchema = z.object({
  documentName: z.string().min(1, "Nama dokumen wajib diisi"),
  fileType: z.string().min(1, "Tipe file wajib diisi"),
  isRequired: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean()
  ),
});

export type LetterDocumentSchema = z.infer<typeof letterDocumentSchema>;
