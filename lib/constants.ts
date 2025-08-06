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

export const HOOK_TEMPLATES = [
  {
    id: "cinematic_intro",
    name: "Cinematic Intro",
    description: "Epic text reveal with dramatic music and lens flare effects.",
    thumbnail: "/cinematic.png",
  },
  {
    id: "vibe_opener",
    name: "Vibe Opener",
    description: "Trendy, social-style opener with fast cuts and music sync.",
    thumbnail: "/vibe.png",
  },
  {
    id: "documentary_start",
    name: "Documentary Start",
    description: "Slow cinematic opener with narration and ambient tones.",
    thumbnail: "/documentary.png",
  },
  {
    id: "hero_scene",
    name: "Hero Scene",
    description: "A strong visual start with motion-focused elements.",
    thumbnail: "/hero.png",
  },
  {
    id: "retro_wave",
    name: "Retro Wave",
    description: "80s-style grid animations, synth music, and vintage vibe.",
    thumbnail: "/retro.png",
  },
  {
    id: "minimal_highlight",
    name: "Minimal Highlight",
    description: "Sleek product-focused animation with clean transitions.",
    thumbnail: "/minimal.png",
  },
  {
    id: "neon_pulse",
    name: "Neon Pulse",
    description: "Vibrant, glowing effects and rhythmic animations.",
    thumbnail: "/neon.png",
  },
  {
    id: "bold_flash",
    name: "Bold Flash",
    description: "Fast-paced hook with big bold text and zoom transitions.",
    thumbnail: "/bold.png",
  },
];

// for tests
export const transcription = {
  task: "transcribe",
  language: "english",
  duration: 60,
  text: "Or my mother. There's something I need to tell you. No. There's something I need to tell you. I need to thank you. You kept your word to Eshe and Obasi. Taka! You saved me, Mufasa. And I will never forget what you've done. My brother. Oh, guys! I have found a way down, just beyond those near peaks! Is it something I said? Hey, Rafiki. Yes. We are nearing destiny, Mufasa. And so, the earth must shake. To be continued...",
  segments: [
    {
      id: 0,
      seek: 0,
      start: 0,
      end: 2,
      text: " Or my mother.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 1,
      seek: 0,
      start: 4,
      end: 6,
      text: " There's something I need to tell you.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 2,
      seek: 0,
      start: 6,
      end: 9,
      text: " No. There's something I need to tell you.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 3,
      seek: 0,
      start: 9,
      end: 11,
      text: " I need to thank you.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 4,
      seek: 0,
      start: 11,
      end: 14,
      text: " You kept your word to Eshe and Obasi.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 5,
      seek: 0,
      start: 14,
      end: 15,
      text: " Taka!",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 6,
      seek: 0,
      start: 15,
      end: 17,
      text: " You saved me, Mufasa.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 7,
      seek: 0,
      start: 17,
      end: 22,
      text: " And I will never forget what you've done.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 8,
      seek: 0,
      start: 22,
      end: 24,
      text: " My brother.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.2661559283733368,
      compression_ratio: 1.559999942779541,
      no_speech_prob: 0.6090962290763855,
    },
    {
      id: 9,
      seek: 2400,
      start: 25,
      end: 31,
      text: " Oh, guys! I have found a way down, just beyond those near peaks!",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.32234472036361694,
      compression_ratio: 1.244444489479065,
      no_speech_prob: 0.049323756247758865,
    },
    {
      id: 10,
      seek: 2400,
      start: 32,
      end: 34,
      text: " Is it something I said?",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.32234472036361694,
      compression_ratio: 1.244444489479065,
      no_speech_prob: 0.049323756247758865,
    },
    {
      id: 11,
      seek: 2400,
      start: 44,
      end: 45,
      text: " Hey, Rafiki.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.32234472036361694,
      compression_ratio: 1.244444489479065,
      no_speech_prob: 0.049323756247758865,
    },
    {
      id: 12,
      seek: 2400,
      start: 45,
      end: 49,
      text: " Yes. We are nearing destiny, Mufasa.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.32234472036361694,
      compression_ratio: 1.244444489479065,
      no_speech_prob: 0.049323756247758865,
    },
    {
      id: 13,
      seek: 2400,
      start: 49,
      end: 53,
      text: " And so, the earth must shake.",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.32234472036361694,
      compression_ratio: 1.244444489479065,
      no_speech_prob: 0.049323756247758865,
    },
    {
      id: 14,
      seek: 5400,
      start: 54,
      end: 60,
      text: " To be continued...",
      tokens: [Array],
      temperature: 0,
      avg_logprob: -0.7881577610969543,
      compression_ratio: 0.692307710647583,
      no_speech_prob: 0.9155028462409973,
    },
  ],
  usage: { type: "duration", seconds: 60 },
};
