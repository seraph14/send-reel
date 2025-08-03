import { NextResponse } from "next/server";
import Replicate from "replicate";

// IMPORTANT: Your Replicate API key should be set as an environment variable
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Initialize the Replicate client
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// A helper function to map hook IDs to specific prompts and settings
function getPromptForHookId(hookId: string) {
  // Using a placeholder image URL for the Replicate model.
  // In a real app, this image would be dynamically provided or uploaded.
  const placeholderImage =
    "https://replicate.delivery/pbxt/NSd5IMhscIZLTG2oZZpzNx8FzQqRcV8573W1uz0hg7ya3rvl/woman-city-doodle.jpg";

  switch (hookId) {
    case "hook1":
      return {
        model: "google/veo-3",
        prompt:
          "A vibrant, vertical 9:16 animation of colorful 3D shapes and glowing particles swirling around each other, eventually forming the phrase 'Your Story Starts Here' in glowing text. Designed as an attention-grabbing opener for short-form content. Duration: 5 seconds.",
      };
    case "hook2":
      return {
        model: "pika-labs/pika-1",
        prompt:
          "A cinematic, animated 9:16 vertical video of a golden sunrise breaking over the African savanna. The camera slowly rises to reveal the silhouette of a majestic lion standing on Pride Rock, wind rustling his mane. Dust glows in the light as the music swells. Epic, emotional, and timeless — a legendary opening shot. Duration: 5 seconds.",
      };
    case "hook3":
      return {
        model: "google/veo-3",
        prompt:
          "A cinematic, vertical video of a person standing on a mountain peak at dawn, wind blowing through their hair, camera slowly zooming in. Bright golden sunlight floods the scene. Designed to inspire viewers within 5 seconds — social media optimized.",
      };
    case "hook4":
      return {
        model: "google/veo-3",
        prompt:
          "A fast-cut sequence of colorful lights, crowds dancing, and close-up expressive faces, all in vertical 9:16 format. Perfect for music intros on TikTok or Reels. Duration: 5 seconds. Mood: euphoric and cinematic",
      };
    case "hook5":
      return {
        model: "google/veo-3",
        prompt:
          "A soft, dreamy vertical 9:16 video of a young woman opening a window to morning sunlight, with particles of dust glowing in the air. The camera glides gently as soft music plays. Perfect for lifestyle creators, vloggers, and Reels. Duration: 5 seconds.",
      };
    default:
      return null;
  }
}

// This API route will handle the request to generate a video hook using Replicate.
export async function POST(request: Request) {
  try {
    const { hookId } = await request.json();

    if (!hookId) {
      return NextResponse.json(
        { error: "No hook ID provided for generation." },
        { status: 400 }
      );
    }

    if (!REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token is not set." },
        { status: 500 }
      );
    }

    const hookData = getPromptForHookId(hookId);

    if (!hookData) {
      return NextResponse.json({ error: "Invalid hook ID." }, { status: 400 });
    }

    console.log("Starting video generation on Replicate for hook:", hookId);
    console.log("Using prompt:", hookData.prompt);

    // --- STEP 1: Run the Replicate prediction ---
    // The `replicate.run()` method automatically handles starting the prediction
    // and polling for the result, returning the final output.
    const output = await replicate.run("google/veo-3", {
      input: {
        prompt: hookData.prompt,
        aspect_ratio: "9:16",
        output_format: "mp4",
        duration: 6,
      },
    });

    // @ts-expect-error
    const videoUrl = output.url().href;

    if (!videoUrl) {
      throw new Error("Replicate prediction failed to return a video URL.");
    }

    console.log("Video hook generated successfully. URL:", videoUrl);

    return NextResponse.json(
      {
        message: "Video hook generated successfully!",
        videoUrl: videoUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during video hook generation:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to generate video hook: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred during video hook generation." },
      { status: 500 }
    );
  }
}
