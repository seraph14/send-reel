import { NextResponse } from "next/server";
import { promisify } from "util";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import Ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";
import { randomUUID } from "crypto";

const pump = promisify(pipeline);

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

    // --- STEP 1: Fetch the video from the public URL ---
    const videoResponse = await fetch(userVideoUrl);
    if (!videoResponse.ok) {
      throw new Error("Failed to fetch video from the provided URL.");
    }

    const videoStream = videoResponse.body;
    const tempVideoPath = `/tmp/${randomUUID()}.mp4`;
    const tempAudioPath = `/tmp/${randomUUID()}.mp3`;

    // Save the video stream to a temporary file
    // @ts-expect-error: This line works no need for type check
    await pump(videoStream, createWriteStream(tempVideoPath));

    console.log(`Video successfully saved to temporary path: ${tempVideoPath}`);

    // --- STEP 2: Extract audio using 'fluent-ffmpeg' ---
    await new Promise<void>((resolve, reject) => {
      Ffmpeg(tempVideoPath)
        .noVideo()
        .audioCodec("libmp3lame")
        .save(tempAudioPath)
        .on("end", () => {
          console.log(
            `Audio successfully extracted to temporary path: ${tempAudioPath}`
          );
          resolve();
        })
        .on("error", (err) => {
          console.error(
            "An error occurred during audio extraction:",
            err.message
          );
          reject(err);
        });
    });

    // --- STEP 3: Send audio to an AI transcription service (e.g., OpenAI) ---
    // In a real application, you would configure your API key in an environment variable.
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const transcription = await openai.audio.transcriptions.create({
      file: createReadStream(tempAudioPath),
      model: "whisper-1",
      response_format: "verbose_json",
    });

    // For this demonstration, we'll use a static response that matches the expected format.
    // const transcription = {
    //   task: "transcribe",
    //   language: "english",
    //   duration: 60,
    //   text: "Or my mother. There's something I need to tell you. No. There's something I need to tell you. I need to thank you. You kept your word to Eshe and Obasi. Taka! You saved me, Mufasa. And I will never forget what you've done. My brother. Oh, guys! I have found a way down, just beyond those near peaks! Is it something I said? Hey, Rafiki. Yes. We are nearing destiny, Mufasa. And so, the earth must shake. To be continued...",
    //   segments: [
    //     {
    //       id: 0,
    //       seek: 0,
    //       start: 0,
    //       end: 2,
    //       text: " Or my mother.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 1,
    //       seek: 0,
    //       start: 4,
    //       end: 6,
    //       text: " There's something I need to tell you.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 2,
    //       seek: 0,
    //       start: 6,
    //       end: 9,
    //       text: " No. There's something I need to tell you.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 3,
    //       seek: 0,
    //       start: 9,
    //       end: 11,
    //       text: " I need to thank you.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 4,
    //       seek: 0,
    //       start: 11,
    //       end: 14,
    //       text: " You kept your word to Eshe and Obasi.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 5,
    //       seek: 0,
    //       start: 14,
    //       end: 15,
    //       text: " Taka!",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 6,
    //       seek: 0,
    //       start: 15,
    //       end: 17,
    //       text: " You saved me, Mufasa.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 7,
    //       seek: 0,
    //       start: 17,
    //       end: 22,
    //       text: " And I will never forget what you've done.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 8,
    //       seek: 0,
    //       start: 22,
    //       end: 24,
    //       text: " My brother.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.2661559283733368,
    //       compression_ratio: 1.559999942779541,
    //       no_speech_prob: 0.6090962290763855,
    //     },
    //     {
    //       id: 9,
    //       seek: 2400,
    //       start: 25,
    //       end: 31,
    //       text: " Oh, guys! I have found a way down, just beyond those near peaks!",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.32234472036361694,
    //       compression_ratio: 1.244444489479065,
    //       no_speech_prob: 0.049323756247758865,
    //     },
    //     {
    //       id: 10,
    //       seek: 2400,
    //       start: 32,
    //       end: 34,
    //       text: " Is it something I said?",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.32234472036361694,
    //       compression_ratio: 1.244444489479065,
    //       no_speech_prob: 0.049323756247758865,
    //     },
    //     {
    //       id: 11,
    //       seek: 2400,
    //       start: 44,
    //       end: 45,
    //       text: " Hey, Rafiki.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.32234472036361694,
    //       compression_ratio: 1.244444489479065,
    //       no_speech_prob: 0.049323756247758865,
    //     },
    //     {
    //       id: 12,
    //       seek: 2400,
    //       start: 45,
    //       end: 49,
    //       text: " Yes. We are nearing destiny, Mufasa.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.32234472036361694,
    //       compression_ratio: 1.244444489479065,
    //       no_speech_prob: 0.049323756247758865,
    //     },
    //     {
    //       id: 13,
    //       seek: 2400,
    //       start: 49,
    //       end: 53,
    //       text: " And so, the earth must shake.",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.32234472036361694,
    //       compression_ratio: 1.244444489479065,
    //       no_speech_prob: 0.049323756247758865,
    //     },
    //     {
    //       id: 14,
    //       seek: 5400,
    //       start: 54,
    //       end: 60,
    //       text: " To be continued...",
    //       tokens: [Array],
    //       temperature: 0,
    //       avg_logprob: -0.7881577610969543,
    //       compression_ratio: 0.692307710647583,
    //       no_speech_prob: 0.9155028462409973,
    //     },
    //   ],
    //   usage: { type: "duration", seconds: 60 },
    // };

    console.log("Successfully formatted and returned captions.");

    return NextResponse.json(
      {
        text: transcription.text,
        words: transcription.segments,
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
