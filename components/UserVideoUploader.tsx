"use client";

import React from "react";

interface UserVideoUploaderProps {
  userVideoFile: File | null;
  userVideoUrl: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserVideoUploader = ({
  userVideoFile,
  userVideoUrl,
  onFileChange,
}: UserVideoUploaderProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <input
        type="file"
        accept="video/*"
        onChange={onFileChange}
        className="hidden"
        id="video-upload"
        ref={fileInputRef}
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
      {userVideoFile && (
        <p className="mt-3 text-sm text-gray-700">
          Selected: <span className="font-semibold">{userVideoFile.name}</span>
        </p>
      )}
      {userVideoUrl && (
        <p className="mt-3 text-sm text-green-600 font-semibold">
          Video Ready for Preview!
        </p>
      )}
    </div>
  );
};

export default UserVideoUploader;
