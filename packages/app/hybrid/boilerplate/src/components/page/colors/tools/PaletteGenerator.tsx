'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy, FiShuffle } from 'react-icons/fi';
import { randomPalette } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

const DEFAULT_PALETTE = ['#ff0030', '#ff8054', '#ffd166', '#7bdff2', '#3a86ff'];

export const PaletteGenerator: FC = () => {
  const [palette, setPalette] = useState<string[]>(DEFAULT_PALETTE);
  const { copied, copy } = useClipboard();

  const generate = () => {
    setPalette(randomPalette());
  };

  return (
    <div data-testid="palette-generator" className="flex flex-col gap-4">
      <button
        type="button"
        className="btn btn-primary btn-sm w-fit"
        onClick={generate}>
        <FiShuffle />
        Generate palette
      </button>
      <div className="flex gap-2">
        {palette.map((hex, index) => (
          <button
            key={`${index}-${hex}`}
            type="button"
            aria-label={`Copy ${hex}`}
            className="border-base-300 flex flex-1 flex-col overflow-hidden rounded-lg border"
            onClick={() => copy(hex, hex)}>
            <div className="h-16 w-full" style={{ backgroundColor: hex }} />
            <div className="bg-base-100 flex items-center justify-between px-2 py-1.5">
              <span className="text-base-content/70 font-mono text-[10px] uppercase">
                {hex}
              </span>
              {copied === hex ? (
                <FiCheck className="text-success shrink-0" />
              ) : (
                <FiCopy className="text-base-content/40 shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
      <TheoryNote title="Palette Design">
        The generator picks a random base hue, shifts it into a nearby secondary
        hue, then varies saturation and lightness across five colors. That
        mirrors analogous harmony — colors near each other on the wheel — which
        tends to feel cohesive, while small lightness differences add hierarchy.
      </TheoryNote>
    </div>
  );
};
PaletteGenerator.displayName = 'PaletteGenerator';
