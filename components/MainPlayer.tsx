"use client";

import { FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "@/lib/constants";
import { CaptionWord } from "@/lib/types";
import { MainVideo } from "@/remotion/compositions/MainVideo";
import { Player } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { VideoTrimSlider } from "./VideoTrimSlider";

export default function MainPlayer({
  selectedHook,
  aiHookVideoUrl,
  uploadedS3Url,
  userVideoPreviewUrl,
  captions,
  captionYOffset,
}: {
  selectedHook: string;
  aiHookVideoUrl: string;
  userVideoPreviewUrl?: string;
  uploadedS3Url?: string;
  captions: CaptionWord[];
  captionYOffset: number;
}) {
  // We use a fallback duration for initial render, it will be updated once video metadata is loaded.
  const [videoDurationInSeconds, setVideoDurationInSeconds] =
    useState<number>(15);
  const [trim, setTrim] = useState<{ start: number; end: number }>({
    start: 0,
    end: videoDurationInSeconds,
  });

  // Use a ref to the video element to get its metadata.
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !uploadedS3Url) return;

    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        setVideoDurationInSeconds(video.duration);
        setTrim({ start: 0, end: video.duration });
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [uploadedS3Url]);

  // Calculate the duration of the trimmed segment in frames.
  const trimmedDurationInFrames = Math.round((trim.end - trim.start) * FPS);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full max-w-sm aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative shadow-xl border border-gray-300">
        <video
          ref={videoRef}
          src={userVideoPreviewUrl ?? uploadedS3Url!}
          style={{ display: "none" }}
          preload="metadata"
        />

        <Player
          component={MainVideo}
          durationInFrames={trimmedDurationInFrames}
          fps={FPS}
          compositionWidth={VIDEO_WIDTH}
          compositionHeight={VIDEO_HEIGHT}
          inputProps={{
            hookId: selectedHook,
            aiHookVideoUrl: aiHookVideoUrl,
            userVideoUrl: uploadedS3Url ?? userVideoPreviewUrl!,
            captions: captions,
            captionYOffset,
            trim,
          }}
          controls
          className="w-full h-full"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="">
        {(userVideoPreviewUrl || uploadedS3Url) && (
          <VideoTrimSlider
            duration={videoDurationInSeconds}
            onChange={(start, end) => {
              setTrim({ start, end });
            }}
          />
        )}
      </div>
    </div>
  );
}
