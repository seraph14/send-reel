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

  const transitionDuration = 15;

  return (
    <AbsoluteFill>
      <Video
        src={
          aiHookVideoUrl ||
          "https://replicate.delivery/xezq/X5K2GEyxxH77I5P9QNAjbetx4gD2JimZreZSGEDrSKcBEWHVA/tmpxtbgn5mq.mp4"
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
