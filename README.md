# SendReel

Create attention-grabbing short-form videos for TikTok, Reels, and YouTube Shorts by combining **AI-generated hooks**, your own footage, **auto-captions**, and **smooth transitions** all in a clean, browser-based workflow.

## ✨ Features

- 🎬 **AI Video Hooks** – Select a cinematic intro (5–6s) generated via the Replicate API to grab attention. _(Optionally add a custom prompt when selecting a hook.)_
- 📹 **User Video Upload** – Upload your own footage; it’s cached locally for faster reuse across sessions.
- ✂️ **Trim Your Clip** – Precisely choose the segment of your video to include.
- 💬 **Auto Captions** – Audio is transcribed using OpenAI Whisper to generate perfectly timed captions.
- 🎞️ **Smooth Transitions** – A polished crossfade blends the hook and your video seamlessly.
- 📱 **9:16 Output** – All videos are optimized for vertical platforms (1080x1920).

---

## 🛠️ Tech Stack

- **Next.js** & **React** – Modern web UI.
- **Tailwind CSS** – Rapid styling with utility classes.
- **Remotion** – Programmatic video rendering.
- **Replicate API** – AI video hook generation.
- **OpenAI Whisper API** – For automatic caption generation.
- **Vercel** – Deployment.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone "https://github.com/seraph14/send-reel"
cd send-reel
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set environment variables

Copy .env file here

### 5. Start dev server

```bash
pnpm dev
```

## 🧑‍💻 Usage Flow

1. **Upload Video**  
   → Preview loads immediately in the player.

2. **Trim**  
   → Select start and end points of your clip using the slider.

3. **Select AI Hook**  
   → Pick a cinematic intro style and (optionally) add a custom prompt.

4. **Auto-Captions**  
   → Captions are generated automatically using OpenAI Whisper.

5. **Preview**  
   → See the combined result rendered with Remotion (hook + video + captions).
