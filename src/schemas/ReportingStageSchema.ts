import { z } from "zod";

export const reportingStageSchema = z.object({
  stageName: z.string(),
  startDate: z.any(),
  endDate: z.any(),
});

export type ReportingStageSchema = z.infer<typeof reportingStageSchema>;