'use client';

import { useRef, type FC } from 'react';
import { FiCopy, FiLayers, FiX } from 'react-icons/fi';
import type { CompareMode } from '@/types/compare';
import type { ImageRaster } from '@/types/image';

export interface CompareControlsProps {
  compareRaster: ImageRaster | null;
  mode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
  onLoadFiles: (files: File[]) => void;
  onClear: () => void;
}

const MODE_LABELS: Record<CompareMode, string> = {
  off: 'Compare mode: off',
  side: 'Compare mode: side by side',
  swipe: 'Compare mode: swipe divider',
};

export const CompareControls: FC<CompareControlsProps> = ({
  compareRaster,
  mode,
  onModeChange,
  onLoadFiles,
  onClear,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Compare images">
      <button
        type="button"
        aria-label="Load compare image"
        className="btn btn-ghost min-h-11 min-w-11"
        onClick={() => inputRef.current?.click()}>
        <FiCopy className="text-lg" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        data-testid="compare-input"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length > 0) onLoadFiles(files);
          event.target.value = '';
        }}
      />
      {compareRaster ? (
        <>
          {(Object.keys(MODE_LABELS) as CompareMode[]).map((id) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                aria-label={MODE_LABELS[id]}
                className={`btn btn-square min-h-11 min-w-11 ${active ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => onModeChange(id)}>
                {id === 'side' ? (
                  <FiLayers className="text-lg" />
                ) : (
                  <span>{id === 'off' ? 'Off' : 'Swipe'}</span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Clear compare image"
            className="btn btn-ghost min-h-11 min-w-11"
            onClick={onClear}>
            <FiX className="text-lg" />
          </button>
        </>
      ) : null}
    </div>
  );
};
