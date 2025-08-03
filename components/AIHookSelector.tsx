"use client";

import React from "react";

interface Hook {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface HookSelectorProps {
  hooks: Hook[];
  selectedHook: string | null;
  onSelect: (hookId: string) => void;
}

const AIHookSelector = ({
  hooks,
  selectedHook,
  onSelect,
}: HookSelectorProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
      <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-4">
        {hooks.map((hook) => (
          <div
            key={hook.id}
            className={`inline-block border-2 rounded-md transition-all duration-200 ${
              selectedHook === hook.id
                ? "border-indigo-600 ring-2 ring-indigo-300"
                : "border-gray-200 hover:border-indigo-400"
            }`}
            onClick={() => onSelect(hook.id)}
          >
            <img
              src={hook.thumbnail}
              alt={hook.name}
              className="w-24 h-44 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default AIHookSelector;
