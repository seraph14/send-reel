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

export const HOOK_PROMPTS: Record<string, string> = {
  lion_king_mufasa: `
    At sunrise, a wide savanna glows in golden light. The camera rises slowly to reveal a majestic lion standing atop Pride Rock, wind catching its mane. Epic orchestral score swells. Feels like a trailer moment. 9:16 cinematic vertical shot, 5s duration.
  `,

  cinematic_intro: `
    A 9:16 cinematic opening shot over epic landscapes with dynamic lens flares. Slow pan across misty mountains, bold golden text animates into frame. Dramatic orchestral soundtrack. Feels like the start of a blockbuster film trailer. 5s duration.
  `,

  minimal_highlight: `
    A clean 9:16 product scene on a white background. A modern gadget slowly rotates, bold black sans-serif text fades in with elegant motion. Subtle shadows, premium feel, minimal color palette. Ideal for luxury brands. 5s duration.
  `,

  vibe_opener: `
    A fast-paced 9:16 edit full of personality. Colorful city streets, energetic match cuts, fast zooms synced to upbeat music. Feels spontaneous and social-first — perfect for reels, TikTok, or short-form promos. 5s duration.
  `,

  documentary_start: `
    A slow and atmospheric vertical video in 9:16. Drone shot gliding over foggy forest at dawn. Ambient soundscape plays beneath soft narration. Designed to feel introspective, cinematic, and grounded. 5s duration.
  `,

  bold_flash: `
    High-impact 9:16 vertical animation. Bold text slams onto screen with glitch, zoom, and shake effects. Audio stingers match transitions. Feels urgent, perfect for ads or content hooks. 5s duration.
  `,

  hero_scene: `
    A person stands alone at the edge of a glowing cliff. Wind moves through their hair, backlit by the rising sun. Inspirational music builds as the phrase “It Starts Here” fades in. Cinematic 9:16 vertical, 5s duration.
  `,

  neon_pulse: `
    A futuristic 9:16 vertical loop with glowing neon lights and pulsing geometric shapes. City skyline in the background, reflections on wet streets, synthwave beat drives rhythm. Great for tech or nightlife. 5s duration.
  `,

  retro_wave: `
    1980s-inspired vertical animation in 9:16. Purple-orange sunset, vaporwave gridlines, glowing chrome text slides in. Feels like a retro arcade intro with synth beats and nostalgia. 5s duration.
  `,
};
