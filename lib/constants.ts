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
    At sunrise, a vast savanna glows under golden light. The camera slowly ascends to reveal a majestic lion standing tall atop Pride Rock, its mane flowing in the wind. A swelling orchestral score builds tension. Epic trailer-style vertical shot (9:16), 5 seconds. 
    Include bold animated text: "Strength. Legacy. Power."
  `,

  cinematic_intro: `
    A vertical 9:16 cinematic opening over epic landscapes. The camera glides across mist-covered mountains with dramatic lens flares piercing the frame. The scene feels like the beginning of a blockbuster. Orchestral soundtrack swells with grandeur. Duration: 5s.
    Default text overlay: "Every Story Has a Beginning"
  `,

  minimal_highlight: `
    A clean 9:16 vertical product shot on a bright white background. A sleek, modern gadget rotates slowly in soft lighting. Subtle shadows and smooth transitions create a premium luxury feel. 5s duration.
    Add elegant black sans-serif animated text: "Refined Simplicity"
  `,

  vibe_opener: `
    A high-energy 9:16 vertical edit filled with urban personality. Fast-paced match cuts of colorful city streets, smiling people, and dynamic camera zooms synced to upbeat music. Feels spontaneous and made for TikTok or Reels. 5s.
    Animated graffiti-style text: "Let's Go"
  `,

  documentary_start: `
    A calm and atmospheric vertical (9:16) opener. A drone glides over foggy forest landscapes at dawn, lit by soft sunlight. An ambient soundscape plays beneath optional soft narration. Feels introspective and cinematic. 5s.
    Include cinematic text: "Every Journey Begins Somewhere"
  `,

  bold_flash: `
    A high-impact 9:16 vertical motion intro. Large bold text slams into view with glitch, zoom, and shake effects. Screen flashes, dramatic audio stingers, and minimal visuals enhance urgency. Great for reels and ad hooks. 5s.
    Text: "Wait for it..."
  `,

  hero_scene: `
    A lone figure stands at the edge of a glowing cliff, hair blowing in the wind. Backlit by a radiant sunrise, the camera slowly pushes in. Inspirational music swells. Vertical cinematic shot (9:16), 5s.
    Default text overlay: "It Starts Here"
  `,

  neon_pulse: `
    A futuristic 9:16 vertical loop with pulsing neon lights and vibrant geometric shapes. Reflections shimmer on rain-slicked streets beneath a city skyline. The synthwave beat drives momentum. 5s duration.
    Neon-styled text: "Pulse of the Night"
  `,

  retro_wave: `
    A nostalgic 1980s-style vertical (9:16) animation. Glowing chrome text slides in over a purple-orange sunset, vaporwave gridlines stretch into the horizon. Synth beats underscore the scene. 5s duration.
    Retro text: "Back to the Future"
  `,
};
