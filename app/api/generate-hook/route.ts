import { HOOK_PROMPTS } from "@/lib/constants";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// IMPORTANT: Your Replicate API key should be set as an environment variable
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Initialize the Replicate client
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// A helper function to map hook IDs to specific prompts and settings
const getPromptForHookId = (hookId: string, userPrompt?: string): string => {
  const basePrompt = HOOK_PROMPTS[hookId];

  if (!basePrompt) return userPrompt ?? "No prompt available";

  if (userPrompt) {
    return `
${basePrompt.trim()}

Include this concept: "${userPrompt.trim()}". Maintain the mood, pacing, and style described.
    `.trim();
  }

  return basePrompt.trim();
};

// This API route will handle the request to generate a video hook using Replicate.
export async function POST(request: Request) {
  try {
    const { hookId, prompt } = await request.json();

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

    const hookData = getPromptForHookId(hookId, prompt);

    if (!hookData) {
      return NextResponse.json({ error: "Invalid hook ID." }, { status: 400 });
    }

    console.log("Starting video generation on Replicate for hook:", hookId);

    // --- STEP 1: Run the Replicate prediction ---
    // The `replicate.run()` method automatically handles starting the prediction
    // and polling for the result, returning the final output.
    const output = await replicate.run("google/veo-3", {
      input: {
        prompt: hookData,
        aspect_ratio: "9:16",
        output_format: "mp4",
        duration: 6,
      },
    });

    // @ts-expect-error: This line works no need for type check
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
