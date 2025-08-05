"use client";

import React, { useState, useEffect } from "react";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import UserVideoUploader from "@/components/UserVideoUploader";
import AIHookSelector from "@/components/AIHookSelector";
import { MyVideo } from "@/lib/types";
import MainPlayer from "@/components/MainPlayer";
import { toast } from "sonner";

export default function CreateVideoPage() {
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [userVideoFile, setUserVideoFile] = useState<File | null>(null);
  const [userVideoPreviewUrl, setUserVideoPreviewUrl] = useState<string | null>(
    null
  );
  const [prompt, setPrompt] = useState<string>("");
  const [uploadedS3Url, setUploadedS3Url] = useState<string | null>(null);

  // Use custom hook to manage state and logic for video creation
  const {
    aiHookVideoUrl,
    captions,
    isLoading,
    downloadLink,
    generateAIHook,
    generateCaptions,
    exportVideo,
    uploadVideoToApi,
    myVideos,
  } = useVideoGeneration();

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
    if (uploadedS3Url) {
      console.log(
        "User video and hook selected. Automatically generating captions..."
      );
      generateCaptions(uploadedS3Url);
    }
  }, [uploadedS3Url]);

  const handleHookSelect = (hookId: string) => {
    setSelectedHook(hookId);
    generateAIHook(hookId, prompt);
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

      // Start the upload to S3 via the API immediately using the hook
      const s3FileUrl = await uploadVideoToApi(file);
      setUploadedS3Url(s3FileUrl);
    }
  };

  const handleSelectMyVideo = (video: MyVideo) => {
    // Set the selected video's details
    setUserVideoFile(null); // No file object, as it's from the cache
    setUserVideoPreviewUrl(video.s3Url);
    setUploadedS3Url(video.s3Url);

    console.log("Selected video from cache:", video.name);
  };

  const hookTemplates = [
    {
      id: "cinematic_intro",
      name: "Cinematic Intro",
      description:
        "Epic text reveal with dramatic music and lens flare effects.",
      thumbnail: "https://placehold.co/160x284/1F2937/FBBF24?text=Cinematic",
    },
    {
      id: "minimal_highlight",
      name: "Minimal Highlight",
      description: "Sleek product-focused animation with clean transitions.",
      thumbnail: "https://placehold.co/160x284/F3F4F6/111827?text=Minimal",
    },
    {
      id: "vibe_opener",
      name: "Vibe Opener",
      description: "Trendy, social-style opener with fast cuts and music sync.",
      thumbnail: "https://placehold.co/160x284/FEF3C7/78350F?text=Vibe",
    },
    {
      id: "documentary_start",
      name: "Documentary Start",
      description: "Slow cinematic opener with narration and ambient tones.",
      thumbnail: "https://placehold.co/160x284/D1D5DB/111827?text=Doc+Intro",
    },
    {
      id: "bold_flash",
      name: "Bold Flash",
      description: "Fast-paced hook with big bold text and zoom transitions.",
      thumbnail: "https://placehold.co/160x284/FFE4E6/BE123C?text=Bold",
    },
    {
      id: "hero_scene",
      name: "Hero Scene",
      description: "A strong visual start with motion-focused elements.",
      thumbnail: "https://placehold.co/160x284/DBEAFE/1E3A8A?text=Hero",
    },
    {
      id: "neon_pulse",
      name: "Neon Pulse",
      description: "Vibrant, glowing effects and rhythmic animations.",
      thumbnail: "https://placehold.co/160x284/111827/22D3EE?text=Neon",
    },
    {
      id: "retro_wave",
      name: "Retro Wave",
      description: "80s-style grid animations, synth music, and vintage vibe.",
      thumbnail: "https://placehold.co/160x284/FDE68A/7C3AED?text=Retro",
    },
    {
      id: "lion_king_mufasa",
      name: "Lion King Style",
      description: "Majestic intro with sunrise and orchestral swell.",
      thumbnail: "https://placehold.co/160x284/FCD34D/78350F?text=Mufasa",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create UGC Videos
      </h1>
      <div className="flex flex-wrap-reverse lg:flex-nowrap gap-8 bg-[#E6E6E1] p-8 rounded-2xl">
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
              handlePrompt={setPrompt}
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

          {/* Additional Functionality Button */}
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
              disabled={
                !(uploadedS3Url && aiHookVideoUrl && captions && !isLoading)
              }
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
          {/* Remotion Player integration */}
          {isLoading ? (
            <div className="w-full max-w-sm aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-xl border border-gray-300">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-600 border-opacity-50"></div>
            </div>
          ) : (userVideoPreviewUrl || uploadedS3Url) && selectedHook ? (
            <MainPlayer
              aiHookVideoUrl={aiHookVideoUrl!}
              selectedHook={selectedHook}
              userVideoPreviewUrl={userVideoPreviewUrl!}
              uploadedS3Url={uploadedS3Url ?? undefined}
              captions={captions}
            />
          ) : (
            <div className="w-full max-w-sm aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative shadow-xl border border-gray-300">
              <img
                src="https://placehold.co/360x640/D1D5DB/6B7280?text=Video+Preview"
                alt="Video Placeholder"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* My Videos Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            My Videos ({myVideos.length || 0})
          </h2>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-6">
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
                  src={video.s3Url}
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
