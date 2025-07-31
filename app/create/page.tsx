"use client"; // This page will contain client-side interactivity

import React, { useState } from "react";
// We'll import Remotion Player and other components later
// import { Player } from '@remotion/player';
// import { MyVideoComposition } from '../../remotion/MyVideoComposition'; // Placeholder for your main Remotion composition

export default function CreateVideoPage() {
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [userVideo, setUserVideo] = useState<File | null>(null);
  const [captions, setCaptions] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder functions for future implementation
  const handleHookSelect = (hookId: string) => {
    setSelectedHook(hookId);
    console.log("Selected hook:", hookId);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Basic file type validation
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file.");
        setUserVideo(null);
        return;
      }
      // Basic file size limit (e.g., 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError("Video file size exceeds 100MB limit.");
        setUserVideo(null);
        return;
      }
      setUserVideo(file);
      setError(null);
      console.log("Uploaded video:", file.name);
    }
  };

  const generateCaptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual API call to OpenAI for caption generation
      console.log("Generating captions...");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCaptions("This is an example caption generated automatically.");
      console.log("Captions generated!");
    } catch (err) {
      setError("Failed to generate captions. Please try again.");
      console.error("Caption generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportVideo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual API call to Remotion for video rendering/export
      console.log("Exporting video...");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // In a real app, this would trigger a download or provide a link
      alert("Video exported successfully! (Simulated)");
      console.log("Video exported!");
    } catch (err) {
      setError("Failed to export video. Please try again.");
      console.error("Video export error:", err);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Create Your Video
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Left Sidebar: Inputs */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            1. Choose AI Hook
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {hookTemplates.map((hook) => (
              <div
                key={hook.id}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  selectedHook === hook.id
                    ? "border-indigo-600 ring-2 ring-indigo-300"
                    : "border-gray-200 hover:border-indigo-400"
                }`}
                onClick={() => handleHookSelect(hook.id)}
              >
                <img
                  src={hook.thumbnail}
                  alt={hook.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {hook.name}
                </h3>
                <p className="text-sm text-gray-600">{hook.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">
            2. Upload Your Video
          </h2>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full"
            >
              <svg
                className="w-12 h-12 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              <p className="text-gray-600 font-medium">
                Drag & Drop or <span className="text-indigo-600">Browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">(Max 100MB, MP4/MOV)</p>
            </label>
            {userVideo && (
              <p className="mt-3 text-sm text-gray-700">
                Selected:{" "}
                <span className="font-semibold">{userVideo.name}</span>
              </p>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">
            3. Generate Captions
          </h2>
          <button
            onClick={generateCaptions}
            disabled={!userVideo || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            {isLoading ? "Generating..." : "Generate Captions"}
          </button>
          {captions && (
            <div className="bg-gray-100 p-4 rounded-md mt-4 text-sm text-gray-700 whitespace-pre-wrap">
              <p className="font-semibold mb-2">Generated Captions:</p>
              {captions}
            </div>
          )}
        </div>

        {/* Center Section: Video Preview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Video Preview
          </h2>
          <div className="w-full max-w-md aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
            {/* Remotion Player will go here */}
            {/* For now, a placeholder */}
            <p className="text-gray-500 text-lg">
              Your video preview will appear here.
            </p>
            {/* Example of a placeholder image */}
            {!userVideo && !selectedHook && (
              <img
                src="https://placehold.co/360x640/D1D5DB/6B7280?text=Video+Preview"
                alt="Video Placeholder"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/*
            {userVideo && selectedHook && (
              <Player
                component={MyVideoComposition} // Your main Remotion composition
                durationInFrames={300} // Example duration
                fps={30}
                compositionWidth={1080} // Vertical video width
                compositionHeight={1920} // Vertical video height
                inputProps={{
                  // Pass data to your Remotion composition
                  hookId: selectedHook,
                  userVideoUrl: URL.createObjectURL(userVideo), // Use a blob URL for local preview
                  captions: captions,
                }}
                controls
                className="w-full h-full"
              />
            )}
            */}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            4. Export Video
          </h2>
          <button
            onClick={exportVideo}
            disabled={!selectedHook || !userVideo || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
          >
            {isLoading ? "Exporting..." : "Export Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
