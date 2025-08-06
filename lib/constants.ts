import z from "zod";
import { CompositionProps } from "./types";

export const defaultMainProps: z.infer<typeof CompositionProps> = {
  hookId: "hook1",
  aiHookVideoUrl:
    "https://placehold.co/1080x1920/D1D5DB/6B7280?text=AI+Hook+Video",
  userVideoUrl:
    "https://placehold.co/1080x1920/FEE2E2/EF4444?text=Your+Video+Here",
  captions: [
    { word: "This", start: 0, end: 500 },
    { word: "is", start: 600, end: 800 },
    { word: "a", start: 900, end: 1000 },
    { word: "sample", start: 1100, end: 1500 },
    { word: "caption", start: 1600, end: 2200 },
    { word: "from", start: 2300, end: 2500 },
    { word: "default", start: 2600, end: 3000 },
    { word: "props", start: 3100, end: 3500 },
  ],
  captionYOffset: 5,
};

// Define the dimensions for a vertical video (9:16 aspect ratio)
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30; // Frames per second

export const HOOK_PROMPTS: Record<string, string> = {
  cinematic_intro: `
    A sweeping 9:16 vertical cinematic opening. The camera soars across mist-covered mountain ranges with golden morning light streaming through. Dramatic lens flares and ambient atmosphere establish a powerful and emotional opening. 
    Duration: 5 seconds.
  `,

  minimal_highlight: `
    A crisp 9:16 product showcase on a white seamless background. A sleek, modern gadget rotates slowly under soft, even lighting. Clean shadows and smooth camera motion emphasize elegance and craftsmanship.
    Duration: 5 seconds.
  `,

  vibe_opener: `
    A fast-paced 9:16 vertical montage bursting with energy. Rapid urban cuts: skateboards, graffiti, neon lights, and people dancing through city streets. Quick zooms and dynamic transitions sync with an upbeat rhythm to create an engaging opener.
    Duration: 5 seconds.
  `,

  documentary_start: `
    A tranquil 9:16 vertical opening sequence. A drone glides silently above misty forests at dawn. Sunlight gently pierces through the trees as birds soar overhead. Peaceful, cinematic, and introspective.
    Duration: 5 seconds.
  `,

  bold_flash: `
    A bold and aggressive 9:16 vertical motion piece. High-contrast visuals with rapid glitch transitions, screen pulses, and zoom-ins. Fast motion effects and cuts build tension in a powerful, urgent way.
    Duration: 5 seconds.
  `,

  hero_scene: `
    A lone silhouette stands on the edge of a cliff in full 9:16 frame. The background glows with a rising sun, casting long shadows. The camera slowly pushes in as ambient music builds intensity. A heroic, cinematic visual.
    Duration: 5 seconds.
  `,

  neon_pulse: `
    A futuristic 9:16 vertical sequence. Pulsing neon lights reflect off rain-slicked streets. Geometric shapes shift and rotate rhythmically with a synth-heavy soundtrack. A cyberpunk vibe filled with motion and glow.
    Duration: 5 seconds.
  `,

  retro_wave: `
    A retro 9:16 animated loop inspired by the 80s. Chrome elements glide across a vaporwave grid set under a vivid purple-orange sunset. The horizon pulses gently to the beat of synthwave music. 
    Duration: 5 seconds.
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
  text: "Or my mother. There's something I need to tell you. No. There's something I need to tell you. I need to thank you. You kept your word to Eshe and Obasi. Taka! You saved me, Mufasa. And I will never forget what you've done. My brother. Oh, guys! I have found a way down! Just beyond those near peaks! Is it something I said? Hey, Rafiki. Yes. We are nearing destiny, Mufasa. And so, the earth must shake. Mufasa.",
  words: [
    { word: "Or", start: 0, end: 0.5199999809265137 },
    { word: "my", start: 0.5199999809265137, end: 0.8399999737739563 },
    {
      word: "mother",
      start: 0.8399999737739563,
      end: 1.1799999475479126,
    },
    {
      word: "There's",
      start: 4.179999828338623,
      end: 4.300000190734863,
    },
    {
      word: "something",
      start: 4.300000190734863,
      end: 4.639999866485596,
    },
    { word: "I", start: 4.639999866485596, end: 4.980000019073486 },
    { word: "need", start: 4.980000019073486, end: 5.119999885559082 },
    { word: "to", start: 5.119999885559082, end: 5.340000152587891 },
    { word: "tell", start: 5.340000152587891, end: 5.440000057220459 },
    { word: "you", start: 5.440000057220459, end: 5.739999771118164 },
    { word: "No", start: 5.739999771118164, end: 5.739999771118164 },
    {
      word: "There's",
      start: 6.599999904632568,
      end: 6.940000057220459,
    },
    {
      word: "something",
      start: 6.940000057220459,
      end: 7.199999809265137,
    },
    { word: "I", start: 7.199999809265137, end: 7.679999828338623 },
    { word: "need", start: 7.679999828338623, end: 7.960000038146973 },
    { word: "to", start: 7.960000038146973, end: 8.199999809265137 },
    { word: "tell", start: 8.199999809265137, end: 8.34000015258789 },
    { word: "you", start: 8.34000015258789, end: 8.579999923706055 },
    { word: "I", start: 9.600000381469727, end: 9.800000190734863 },
    { word: "need", start: 9.800000190734863, end: 10.020000457763672 },
    { word: "to", start: 10.020000457763672, end: 10.260000228881836 },
    {
      word: "thank",
      start: 10.260000228881836,
      end: 10.539999961853027,
    },
    { word: "you", start: 10.539999961853027, end: 10.720000267028809 },
    { word: "You", start: 11.520000457763672, end: 11.699999809265137 },
    {
      word: "kept",
      start: 11.699999809265137,
      end: 12.020000457763672,
    },
    {
      word: "your",
      start: 12.020000457763672,
      end: 12.539999961853027,
    },
    {
      word: "word",
      start: 12.539999961853027,
      end: 12.600000381469727,
    },
    { word: "to", start: 12.600000381469727, end: 13.399999618530273 },
    {
      word: "Eshe",
      start: 13.399999618530273,
      end: 13.619999885559082,
    },
    { word: "and", start: 13.619999885559082, end: 13.899999618530273 },
    {
      word: "Obasi",
      start: 13.899999618530273,
      end: 14.319999694824219,
    },
    { word: "Taka", start: 14.4399995803833, end: 14.739999771118164 },
    { word: "You", start: 14.9399995803833, end: 15 },
    { word: "saved", start: 15, end: 15.300000190734863 },
    { word: "me", start: 15.300000190734863, end: 15.579999923706055 },
    {
      word: "Mufasa",
      start: 15.579999923706055,
      end: 15.920000076293945,
    },
    { word: "And", start: 16.920000076293945, end: 17.31999969482422 },
    { word: "I", start: 17.31999969482422, end: 17.760000228881836 },
    { word: "will", start: 17.760000228881836, end: 19.34000015258789 },
    { word: "never", start: 19.34000015258789, end: 19.65999984741211 },
    {
      word: "forget",
      start: 19.65999984741211,
      end: 20.280000686645508,
    },
    {
      word: "what",
      start: 20.280000686645508,
      end: 21.200000762939453,
    },
    {
      word: "you've",
      start: 21.200000762939453,
      end: 21.65999984741211,
    },
    { word: "done", start: 21.65999984741211, end: 21.65999984741211 },
    { word: "My", start: 22.399999618530273, end: 22.739999771118164 },
    {
      word: "brother",
      start: 22.739999771118164,
      end: 23.079999923706055,
    },
    { word: "Oh", start: 25.399999618530273, end: 26 },
    {
      word: "guys",
      start: 26.459999084472656,
      end: 26.639999389648438,
    },
    { word: "I", start: 26.899999618530273, end: 27.040000915527344 },
    { word: "have", start: 27.040000915527344, end: 27.3799991607666 },
    { word: "found", start: 27.3799991607666, end: 27.68000030517578 },
    { word: "a", start: 27.68000030517578, end: 28.100000381469727 },
    { word: "way", start: 28.100000381469727, end: 28.399999618530273 },
    {
      word: "down",
      start: 28.399999618530273,
      end: 28.899999618530273,
    },
    {
      word: "Just",
      start: 29.020000457763672,
      end: 29.139999389648438,
    },
    {
      word: "beyond",
      start: 29.139999389648438,
      end: 29.3799991607666,
    },
    { word: "those", start: 29.3799991607666, end: 29.639999389648438 },
    {
      word: "near",
      start: 29.639999389648438,
      end: 29.959999084472656,
    },
    {
      word: "peaks",
      start: 29.959999084472656,
      end: 30.219999313354492,
    },
    { word: "Is", start: 31.600000381469727, end: 32.20000076293945 },
    { word: "it", start: 32.20000076293945, end: 32.439998626708984 },
    {
      word: "something",
      start: 32.439998626708984,
      end: 32.52000045776367,
    },
    { word: "I", start: 32.52000045776367, end: 32.7599983215332 },
    { word: "said", start: 32.7599983215332, end: 33.040000915527344 },
    { word: "Hey", start: 43.900001525878906, end: 44.5 },
    {
      word: "Rafiki",
      start: 44.63999938964844,
      end: 44.939998626708984,
    },
    { word: "Yes", start: 46.15999984741211, end: 46.7599983215332 },
    { word: "We", start: 46.880001068115234, end: 47.15999984741211 },
    { word: "are", start: 47.15999984741211, end: 47.619998931884766 },
    {
      word: "nearing",
      start: 47.619998931884766,
      end: 47.79999923706055,
    },
    { word: "destiny", start: 47.79999923706055, end: 48.5 },
    {
      word: "Mufasa",
      start: 48.86000061035156,
      end: 49.13999938964844,
    },
    { word: "And", start: 49.52000045776367, end: 49.91999816894531 },
    { word: "so", start: 49.91999816894531, end: 50.41999816894531 },
    { word: "the", start: 50.439998626708984, end: 51.099998474121094 },
    {
      word: "earth",
      start: 51.099998474121094,
      end: 51.119998931884766,
    },
    { word: "must", start: 51.119998931884766, end: 51.68000030517578 },
    {
      word: "shake",
      start: 51.68000030517578,
      end: 52.119998931884766,
    },
    {
      word: "Mufasa",
      start: 56.52000045776367,
      end: 57.91999816894531,
    },
  ],
  usage: { type: "duration", seconds: 60 },
};
