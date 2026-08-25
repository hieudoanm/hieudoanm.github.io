'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

interface ScreenshotCarouselProps {
  screenshots: string[];
  label: string;
}

export const ScreenshotCarousel: FC<ScreenshotCarouselProps> = ({
  screenshots,
  label,
}) => {
  const [index, setIndex] = useState(0);

  if (screenshots.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIndex((i) => (i + 1) % screenshots.length);

  return (
    <div className="border-base-300 mb-8 border-t pt-6">
      <h2 className="text-base-content/70 mb-3 font-mono text-xs tracking-widest uppercase">
        Screenshots
      </h2>
      <div className="bg-base-200 border-base-300 relative flex items-center justify-center overflow-hidden rounded-lg border">
        {screenshots.length > 1 && (
          <button
            type="button"
            onClick={prev}
            className="btn btn-ghost btn-sm absolute left-2 z-10">
            <PiCaretLeft />
          </button>
        )}
        <img
          src={screenshots[index]}
          alt={`${label} screenshot ${index + 1}`}
          className="max-h-80 object-contain"
        />
        {screenshots.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="btn btn-ghost btn-sm absolute right-2 z-10">
            <PiCaretRight />
          </button>
        )}
      </div>
      {screenshots.length > 1 && (
        <div className="mt-2 flex justify-center gap-1">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 w-1.5 rounded-full ${
                i === index ? 'bg-primary' : 'bg-base-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
ScreenshotCarousel.displayName = 'ScreenshotCarousel';
