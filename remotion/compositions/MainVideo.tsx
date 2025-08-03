import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps } from "@/lib/types";
import z from "zod";
import { AIHook } from "./AIHook";

export const MainVideo = ({
  aiHookVideoUrl,
  userVideoUrl,
  captions,
}: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Captions will appear during the user video segment (after the 5-second hook)
  const hookDurationFrames = fps * 5; // Duration of the AI hook in frames
  const userVideoStartFrame = hookDurationFrames;
  const userVideoCurrentTimeInSeconds = (frame - userVideoStartFrame) / fps;
  const transitionDuration = 20;

  // Interpolate opacity for captions during the user video segment
  const captionOpacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Find the current line to display based on video time
  const currentLine = captions.find((caption) => {
    if (caption) {
      return (
        userVideoCurrentTimeInSeconds >= caption.start &&
        userVideoCurrentTimeInSeconds <= caption.end
      );
    }
    return false;
  });

  return (
    <>
      <AbsoluteFill>
        {/* AI Hook Section (5 seconds) */}
        <Sequence durationInFrames={hookDurationFrames}>
          <AbsoluteFill>
            <AIHook aiHookVideoUrl={aiHookVideoUrl} />
          </AbsoluteFill>
        </Sequence>

        {/* User Video Section (remaining duration) */}
        <Sequence
          durationInFrames={Infinity}
          from={userVideoStartFrame - transitionDuration}
        >
          {" "}
          {/* Infinity means it takes remaining frames */}
          <AbsoluteFill>
            {userVideoUrl ? (
              <Video
                src={userVideoUrl}
                className="w-full h-full object-cover"
                startFrom={0}
                volume={(f) =>
                  interpolate(f, [0, transitionDuration], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                }
                style={{
                  opacity: interpolate(
                    frame,
                    [
                      userVideoStartFrame - transitionDuration,
                      userVideoStartFrame,
                    ],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              />
            ) : (
              <AbsoluteFill className="bg-gray-700 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                  Upload Your Video
                </h1>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        </Sequence>
        {/* Captions overlay */}
        {currentLine && (
          <AbsoluteFill
            className="items-center justify-center px-8" // Vertically and horizontally center
            style={{ opacity: captionOpacity }}
          >
            <div className="w-full max-w-4xl px-6 py-4 rounded-lg">
              <p
                className="text-white text-6xl font-bold text-center leading-snug flex flex-wrap justify-center"
                style={{
                  // Enhanced text shadow for better visibility on any background
                  textShadow:
                    "2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8)",
                  WebkitTextStroke: "1px black", // Adds a black outline to the text
                }}
              >
                <span
                  className={`mx-2 transition-colors duration-200 ${
                    currentLine ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {currentLine.text}
                </span>
              </p>
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </>
  );
};
