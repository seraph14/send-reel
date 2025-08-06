"use client";

import { useEffect, useState } from "react";

type Props = {
  duration: number;
  onChange: (duration: number) => void;
};

export function VideoTrimSlider({ duration, onChange }: Props) {
  const [trimmedDuration, setTrimmedDuration] = useState(duration);
  const handleEndChange = (val: number) => {
    const clamped = Math.max(val, 5);
    setTrimmedDuration(clamped);
    onChange(clamped);
  };

  useEffect(() => {
    setTrimmedDuration(duration);
  }, [duration]);

  return (
    <div className="w-full max-w-sm bg-black text-gray-300 px-4 py-2 flex flex-col">
      <div className="flex justify-between text-xs">
        <span>Start: {(0).toFixed(1)}s</span>
        <span>End: {duration.toFixed(1)}s</span>
      </div>

      <div className="relative h-6">
        {/* Background track */}
        <div className="absolute h-1 w-full bg-gray-700 rounded top-1/2 -translate-y-1/2" />
        {/* Selected range */}
        <div
          className="absolute h-1 bg-blue-500 z-1000 rounded top-1/2 -translate-y-1/2"
          style={{
            left: `${0}%`,
            width: `${(trimmedDuration / duration) * 100}%`,
          }}
        />
        {/* Start thumb */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={0}
          onChange={() => {}}
          className="absolute w-full h-6 bg-transparent z-1000 cursor-pointer"
        />
        {/* End thumb */}
        <input
          type="range"
          min={5}
          max={duration}
          step={0.1}
          value={trimmedDuration}
          onChange={(e) => handleEndChange(parseFloat(e.target.value))}
          className="absolute w-full h-6 bg-transparent z-1000 cursor-pointer"
        />
      </div>
    </div>
  );
}
