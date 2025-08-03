import { AIHookProps } from "@/lib/types";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import z from "zod";

export const AIHook = ({ aiHookVideoUrl }: z.infer<typeof AIHookProps>) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Simple animation: text fades in and out
  const opacity = interpolate(
    frame,
    [0, fps * 1, durationInFrames - fps * 1, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const transitionDuration = 20;

  return (
    <AbsoluteFill>
      <Video
        src={
          aiHookVideoUrl ||
          "https://replicate.delivery/xezq/QPeJZFL8JX2MfUYbvgJtedbztDlIqGj3LS9EUJ6IeS9zPFdUB/tmp30td6b34.mp4"
        }
        className="w-full h-full object-cover"
        volume={(f) =>
          interpolate(
            f,
            [durationInFrames - transitionDuration, durationInFrames],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />
    </AbsoluteFill>
  );
};
