import { z } from 'zod';

export enum SourceProvider {
  YOUTUBE = 'youtube',
}

export enum SourceStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
}

export const sourceProviderSchema = z.nativeEnum(SourceProvider);
export const sourceStatusSchema = z.nativeEnum(SourceStatus);

export const sourceBaseSchema = z.object({
  provider: sourceProviderSchema,
  contentId: z.string(),
});

export const sourceInSchema = sourceBaseSchema.extend({
  metadata: z.record(z.any()).optional().default({}),
});

export const sourceSchema = sourceBaseSchema.extend({
  status: sourceStatusSchema.default(SourceStatus.PENDING),
  metadata: z.record(z.any()),
  createdAt: z.date().default(() => new Date()),
});

export type SourceBase = z.infer<typeof sourceBaseSchema>;
export type SourceIn = z.infer<typeof sourceInSchema>;
export type Source = z.infer<typeof sourceSchema>;