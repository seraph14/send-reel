import { z } from "zod";

export interface CaptionWord {
  word: string;
  start: number;
  end: number;
}

export interface MyVideo {
  name: string;
  s3Url: string;
}

const captionSchema = z.object({
  word: z.string(),
  start: z.number(),
  end: z.number(),
});

export const CompositionProps = z.object({
  hookId: z.string(),
  aiHookVideoUrl: z.string().nullable(),
  userVideoUrl: z.string(),
  captions: captionSchema.array(),
  captionYOffset: z.number(),
});

export const AIHookProps = z.object({
  aiHookVideoUrl: z.string().nullable(),
});
