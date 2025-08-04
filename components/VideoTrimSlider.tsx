"use client";

import { useState } from "react";

type Props = {
  duration: number;
  onChange: (start: number, end: number) => void;
};

export function VideoTrimSlider({ duration, onChange }: Props) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);

  const handleStartChange = (val: number) => {
    const clamped = Math.min(val, end - 0.1);
    setStart(clamped);
    onChange(clamped, end);
  };

  const handleEndChange = (val: number) => {
    const clamped = Math.max(val, start + 0.1);
    setEnd(clamped);
    onChange(start, clamped);
  };

  return (
    <div className="w-full max-w-sm bg-black text-gray-300 px-4 py-2 flex flex-col">
      <div className="flex justify-between text-xs">
        <span>Start: {start.toFixed(1)}s</span>
        <span>End: {end.toFixed(1)}s</span>
      </div>

      <div className="relative h-6">
        {/* Background track */}
        <div className="absolute h-1 w-full bg-gray-700 rounded top-1/2 -translate-y-1/2" />
        {/* Selected range */}
        <div
          className="absolute h-1 bg-blue-500 z-1000 rounded top-1/2 -translate-y-1/2"
          style={{
            left: `${(start / duration) * 100}%`,
            width: `${((end - start) / duration) * 100}%`,
          }}
        />
        {/* Start thumb */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={start}
          onChange={(e) => handleStartChange(parseFloat(e.target.value))}
          className="absolute w-full h-6 bg-transparent z-1000 cursor-pointer"
        />
        {/* End thumb */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={end}
          onChange={(e) => handleEndChange(parseFloat(e.target.value))}
          className="absolute w-full h-6 bg-transparent z-1000 cursor-pointer"
        />
      </div>
    </div>
  );
}
