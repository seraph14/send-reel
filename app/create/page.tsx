"use client";

import React, { useState, useRef, useEffect } from "react";
import { Player } from "@remotion/player"; // Import Remotion Player
import { MainVideo } from "@/remotion/compositions/MainVideo";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import UserVideoUploader from "@/components/UserVideoUploader";
import AIHookSelector from "@/components/AIHookSelector";
import { MyVideo } from "@/lib/types";
import { FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "@/lib/constants";

export default function CreateVideoPage() {
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [userVideoFile, setUserVideoFile] = useState<File | null>(null);
  const [userVideoPreviewUrl, setUserVideoPreviewUrl] = useState<string | null>(
    null
  );
  const [uploadedS3Url, setUploadedS3Url] = useState<string | null>(null);

  // Use custom hook to manage state and logic for video creation
  const {
    aiHookVideoUrl,
    captions,
    isLoading,
    error,
    downloadLink,
    generateAIHook,
    generateCaptions,
    exportVideo,
    uploadVideoToApi,
    myVideos,
    reset,
  } = useVideoGeneration();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up the object URL when the component unmounts or a new file is selected
  useEffect(() => {
    return () => {
      if (userVideoPreviewUrl) {
        URL.revokeObjectURL(userVideoPreviewUrl);
      }
    };
  }, [userVideoPreviewUrl]);

  // automatically generate captions
  useEffect(() => {
    if (userVideoPreviewUrl) {
      console.log(
        "User video and hook selected. Automatically generating captions..."
      );
      generateCaptions(userVideoPreviewUrl);
    }
  }, [userVideoPreviewUrl]);

  const handleHookSelect = (hookId: string) => {
    setSelectedHook(hookId);
    // generateAIHook(hookId);
    console.log("Selected hook:", hookId);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Basic file type validation
      if (!file.type.startsWith("video/")) {
        console.error("Please upload a valid video file (e.g., MP4, MOV).");
        setUserVideoFile(null);
        setUserVideoPreviewUrl(null);
        return;
      }
      // Basic file size limit (e.g., 100MB)
      const MAX_FILE_SIZE_MB = 100;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        console.error(`Video file size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        setUserVideoFile(null);
        setUserVideoPreviewUrl(null);
        return;
      }

      setUserVideoFile(file);

      // Directly create a URL for the selected file for immediate preview
      if (userVideoPreviewUrl) {
        URL.revokeObjectURL(userVideoPreviewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setUserVideoPreviewUrl(objectUrl);
      setUploadedS3Url(null);
      console.log("Selected video for preview:", file.name, objectUrl);

      //TODO: uncomment this later
      // Start the upload to S3 via the API immediately using the hook
      //   const s3FileUrl = await uploadVideoToApi(file);
      //   setUploadedS3Url(s3FileUrl);
    }
  };

  const handleSelectMyVideo = (video: MyVideo) => {
    // Reset any existing states
    reset();
    setSelectedHook(null);

    // Set the selected video's details
    setUserVideoFile(null); // No file object, as it's from the cache
    setUserVideoPreviewUrl(video.previewUrl);
    setUploadedS3Url(video.s3Url);

    console.log("Selected video from cache:", video.name);
  };

  const hookTemplates = [
    {
      id: "hook1",
      name: "Dynamic Intro",
      description: "Energetic text reveal",
      thumbnail: "https://placehold.co/160x284/E0E7FF/4F46E5?text=Hook+1",
    },
    {
      id: "hook2",
      name: "Clean Showcase",
      description: "Minimalist product display",
      thumbnail: "https://placehold.co/160x284/DBEAFE/3B82F6?text=Hook+2",
    },
    {
      id: "hook3",
      name: "Story Opener",
      description: "Dramatic scene setter",
      thumbnail: "https://placehold.co/160x284/FEE2E2/EF4444?text=Hook+3",
    },
  ];

  // Remotion Player properties
  const REMOTION_DURATION_IN_FRAMES = FPS * 18; // 15 seconds total

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create UGC Videos
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 w-full max-w-4xl"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}
      <div className="flex gap-8 bg-[#E6E6E1] p-8 rounded-2xl">
        {/* Left Column - Controls */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          {/* 1. Hook Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              1. Hook
            </h2>
            <AIHookSelector
              hooks={hookTemplates}
              selectedHook={selectedHook}
              onSelect={handleHookSelect}
            />
          </div>

          {/* 2. User Video and Demos Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              2. User Videos
            </h2>
            <UserVideoUploader
              userVideoFile={userVideoFile}
              userVideoUrl={userVideoPreviewUrl}
              onFileChange={handleFileChange}
            />
          </div>

          {/* Additional Functionality Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() =>
                exportVideo(
                  selectedHook,
                  userVideoPreviewUrl,
                  aiHookVideoUrl,
                  captions
                )
              }
              disabled={!(userVideoPreviewUrl && selectedHook && captions)}
              className="w-[75%] bg-black hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
            >
              {"Export Video"}
            </button>
          </div>
          {downloadLink && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-semibold mb-2">
                Video Exported!
              </p>
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow transition duration-300"
              >
                Download Video
              </a>
            </div>
          )}
        </div>

        {/* Right Column - Video Preview */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-sm aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative shadow-xl border border-gray-300">
            {/* Remotion Player integration */}
            {userVideoPreviewUrl && selectedHook ? (
              <Player
                component={MainVideo} // Use the Root component which contains all compositions
                durationInFrames={REMOTION_DURATION_IN_FRAMES}
                fps={FPS}
                compositionWidth={VIDEO_WIDTH}
                compositionHeight={VIDEO_HEIGHT}
                inputProps={{
                  hookId: selectedHook,
                  aiHookVideoUrl: aiHookVideoUrl,
                  userVideoUrl: userVideoPreviewUrl,
                  captions: captions,
                }}
                controls
                className="w-full h-full"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <img
                  src="https://placehold.co/360x640/D1D5DB/6B7280?text=Video+Preview"
                  alt="Video Placeholder"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* My Videos Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            My Videos ({myVideos.length || 0})
          </h2>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {myVideos.length !== 0 ? (
            myVideos.map((video, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-48 h-80 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer transition-all duration-200 ${
                  uploadedS3Url === video.s3Url
                    ? "border-indigo-600 ring-2 ring-indigo-300"
                    : "border-gray-200 hover:border-indigo-400"
                }`}
                onClick={() => handleSelectMyVideo(video)}
              >
                <video
                  src={video.previewUrl}
                  className="w-full h-full object-cover rounded-md"
                  controls={false}
                  muted
                  loop
                  playsInline
                />
                <p className="text-xs text-center p-1 truncate">{video.name}</p>
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-48 h-80 bg-gray-200 rounded-lg border border-gray-300"></div>
          )}
        </div>
      </div>
    </>
  );
}
