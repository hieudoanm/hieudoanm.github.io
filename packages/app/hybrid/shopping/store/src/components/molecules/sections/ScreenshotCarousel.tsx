'use client';

import type { FC, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { PiCaretLeft, PiCaretRight, PiX } from 'react-icons/pi';

interface ScreenshotCarouselProps {
  screenshots: string[];
  label: string;
}

export const ScreenshotCarousel: FC<ScreenshotCarouselProps> = ({
  screenshots,
  label,
}) => {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % screenshots.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxOpen, screenshots.length]);

  if (screenshots.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIndex((i) => (i + 1) % screenshots.length);
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  const onCarouselKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!lightboxOpen) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

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
            aria-label="Previous screenshot"
            className="btn btn-ghost btn-sm absolute left-2 z-10">
            <PiCaretLeft />
          </button>
        )}
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`View ${label} screenshot ${index + 1} full screen`}
          className="cursor-zoom-in">
          <img
            src={screenshots[index]}
            alt={`${label} screenshot ${index + 1}`}
            className="max-h-80 object-contain"
          />
        </button>
        {screenshots.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="btn btn-ghost btn-sm absolute right-2 z-10">
            <PiCaretRight />
          </button>
        )}
      </div>
      {screenshots.length > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {screenshots.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={`border-2 ${
                i === index ? 'border-primary' : 'border-transparent'
              } overflow-hidden rounded transition-opacity ${
                i === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}>
              <img
                src={src}
                alt={`${label} thumbnail ${i + 1}`}
                className="h-10 w-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} screenshots`}
          onClick={onBackdropClick}
          onKeyDown={onCarouselKeyDown}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close full screen view"
            className="btn btn-ghost btn-circle absolute top-4 right-4 z-10 text-white">
            <PiX />
          </button>
          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="btn btn-ghost btn-circle absolute left-4 z-10 text-white">
              <PiCaretLeft />
            </button>
          )}
          <img
            src={screenshots[index]}
            alt={`${label} screenshot ${index + 1} full screen`}
            className="max-h-[85vh] max-w-full object-contain"
          />
          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="btn btn-ghost btn-circle absolute right-4 z-10 text-white">
              <PiCaretRight />
            </button>
          )}
          <span className="text-base-content/70 absolute bottom-4 font-mono text-xs">
            {index + 1} / {screenshots.length}
          </span>
        </div>
      )}
    </div>
  );
};

ScreenshotCarousel.displayName = 'ScreenshotCarousel';
