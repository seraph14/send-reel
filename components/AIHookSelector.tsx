"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import PromptModal from "./PromptModal";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { HOOK_TEMPLATES } from "@/lib/constants";

interface Hook {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface HookSelectorProps {
  selectedHook: string | null;
  onSelect: (hookId: string) => void;
  handlePrompt: Dispatch<SetStateAction<string>>;
}

const AIHookSelector = ({
  selectedHook,
  onSelect,
  handlePrompt,
}: HookSelectorProps) => {
  const [promptHook, setPromptHook] = useState<Hook | null>(null);
  const [loadingHookId, setLoadingHookId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hooks = HOOK_TEMPLATES;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleHookClick = (hook: Hook) => {
    // Prevent selecting again while waiting
    if (loadingHookId) return;

    setLoadingHookId(hook.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSelect(hook.id);
      setLoadingHookId(null);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
      <button
        className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
        onClick={() => scroll("left")}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" fill="none" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 whitespace-nowrap scrollbar-hide gap-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {hooks.map((hook) => (
          <div
            key={hook.id}
            className={`relative w-25 h-full flex-shrink-0 inline-block border-2 rounded-md transition-all duration-200 cursor-pointer ${
              selectedHook === hook.id
                ? "border-indigo-600 ring-2 ring-indigo-300"
                : "border-gray-200 hover:border-indigo-400"
            } ${
              loadingHookId === hook.id ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => handleHookClick(hook)}
          >
            <Image
              src={hook.thumbnail}
              width={44}
              height={64}
              alt={hook.name}
              className="w-24 h-44 object-cover rounded-md"
            />
            {loadingHookId === hook.id && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-md">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-indigo-500"></div>
              </div>
            )}
            <button
              className="absolute top-0 right-0 bg-[#EEEFE8] border text-gray-800 hover:bg-[#E6E6E1] p-1.5 rounded-lg shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                setPromptHook(hook);
              }}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
        onClick={() => scroll("right")}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 18l6-6-6-6" fill="none" />
        </svg>
      </button>

      {promptHook && (
        <PromptModal
          open={!!promptHook}
          onClose={() => setPromptHook(null)}
          onSave={(newPrompt) => {
            handlePrompt(newPrompt);
          }}
          description={promptHook.description}
          hookName={promptHook.name}
        />
      )}
    </div>
  );
};

export default AIHookSelector;
