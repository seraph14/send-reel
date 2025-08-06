import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CaptionWord, CompositionProps } from "@/lib/types";
import z from "zod";
import { AIHook } from "./AIHook";

export const MainVideo = ({
  aiHookVideoUrl,
  userVideoUrl,
  captions,
  captionYOffset,
}: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Captions will appear during the user video segment (after the 5-second hook)
  const hookDurationFrames = fps * 5; // Duration of the AI hook in frames
  const userVideoStartFrame = hookDurationFrames;
  const userVideoCurrentTimeInSeconds = (frame - userVideoStartFrame) / fps;
  const transitionDuration = 15;

  // Interpolate opacity for captions during the user video segment
  const captionOpacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const segmentWords = (words: CaptionWord[]): CaptionWord[][] => {
    const lines: CaptionWord[][] = [];
    let currentLine: CaptionWord[] = [];
    let lastEnd = 0;

    for (let i = 0; i < words.length; i++) {
      const word = { ...words[i] };
      const gap = word.start - lastEnd;
      const shouldStartNewLine = currentLine.length >= 5 || gap > 3;

      const nextWord = words[i + 1];
      const isNextWordCapital = nextWord && /^[A-Z]/.test(nextWord.word);
      const isLastWord = i === words.length - 1;
      currentLine.push(word);

      if (
        (shouldStartNewLine && currentLine.length) ||
        isNextWordCapital ||
        isLastWord
      ) {
        lines.push(currentLine);
        currentLine = [];
      }

      lastEnd = word.end;
    }
    if (currentLine.length) lines.push(currentLine);
    return lines;
  };

  const captionLines = useMemo(() => segmentWords(captions), [captions]);
  const currentCaptionLine = captionLines.find((line) => {
    const lineStart = line[0]?.start ?? 0;
    const lineEnd = line[line.length - 1]?.end ?? 0;
    return (
      userVideoCurrentTimeInSeconds >= lineStart &&
      userVideoCurrentTimeInSeconds <= lineEnd
    );
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
        <AbsoluteFill
          className="flex justify-center items-center px-auto"
          style={{
            opacity: captionOpacity,
            transform: `translateY(${captionYOffset - 50}%)`, // or `${captionYOffset}px` if you're using pixels
          }}
        >
          <div className="w-full max-w-4xl px-6 py-4 rounded-lg">
            <p
              className="text-white text-6xl font-bold text-center leading-snug flex flex-wrap justify-center"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8)",
                WebkitTextStroke: "1px black",
              }}
            >
              {currentCaptionLine?.map((wordObj, index) => {
                const isActive =
                  userVideoCurrentTimeInSeconds >= wordObj.start &&
                  userVideoCurrentTimeInSeconds <= wordObj.end;

                return (
                  <span
                    key={index}
                    className={`mx-1 transition-colors duration-300 ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`}
                    style={{
                      textShadow:
                        "2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8)",
                      WebkitTextStroke: "0.5px black",
                    }}
                  >
                    {wordObj.word}
                  </span>
                );
              })}
            </p>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
};
