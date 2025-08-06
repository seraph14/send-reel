import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * A backend API route that fetches a video from a public URL,
 * extracts its audio, and generates captions using an AI transcription service.
 */
export async function POST(req: Request) {
  try {
    const { userVideoUrl } = await req.json();

    if (!userVideoUrl) {
      return NextResponse.json(
        { error: "Missing userVideoUrl." },
        { status: 400 }
      );
    }

    const response = await fetch(userVideoUrl);
    const arrayBuffer = await response.arrayBuffer();

    // Create a File object (required by OpenAI SDK)
    const file = new File([Buffer.from(arrayBuffer)], "audio.mp3", {
      type: "audio/mpeg",
    });

    // // Send audio to an AI transcription service (e.g., OpenAI) ---
    // // In a real application, you would configure your API key in an environment variable.
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    console.log("Successfully formatted and returned captions.");

    return NextResponse.json(
      {
        text: transcription.text,
        words: transcription.words,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate captions." },
      { status: 500 }
    );
  }
}
