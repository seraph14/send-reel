import z from "zod";
import { CompositionProps } from "./types";

export const defaultMainProps: z.infer<typeof CompositionProps> = {
  hookId: "hook1",
  aiHookVideoUrl:
    "https://placehold.co/1080x1920/D1D5DB/6B7280?text=AI+Hook+Video",
  userVideoUrl:
    "https://placehold.co/1080x1920/FEE2E2/EF4444?text=Your+Video+Here",
  captions: [
    { text: "This", start: 0, end: 500 },
    { text: "is", start: 600, end: 800 },
    { text: "a", start: 900, end: 1000 },
    { text: "sample", start: 1100, end: 1500 },
    { text: "caption", start: 1600, end: 2200 },
    { text: "from", start: 2300, end: 2500 },
    { text: "default", start: 2600, end: 3000 },
    { text: "props", start: 3100, end: 3500 },
  ],
};

// Define the dimensions for a vertical video (9:16 aspect ratio)
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30; // Frames per second
