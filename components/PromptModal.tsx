"use client";

import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

interface PromptModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (prompt: string) => void;
  description: string;
  hookName: string;
}

const PromptModal = ({
  open,
  onClose,
  onSave,
  description,
  hookName,
}: PromptModalProps) => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    setPrompt(prompt);
  }, [prompt]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-[#EEEFE8] rounded-xl shadow-lg p-6 relative">
        <div className="flex items-center text-lg font-medium text-gray-900 mb-4">
          <Pencil className="w-5 h-5 mr-2 text-black" />
          Customize Prompt for
          <span className="font-semibold ml-1">{hookName}</span>
        </div>

        <p className="p-2">{description}</p>

        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the video hook you want to generate..."
          className="w-full h-40 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none bg-[#E6E6E1]"
        />

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:opacity-90 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(prompt);
              onClose();
            }}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:opacity-90 transition"
          >
            Save Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
