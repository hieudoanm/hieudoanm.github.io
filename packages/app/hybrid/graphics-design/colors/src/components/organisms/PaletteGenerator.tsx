'use client';

import { FC, useState } from 'react';
import { FiShuffle } from 'react-icons/fi';
import { randomPalette } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { Swatch } from '@/components/atoms/Swatch';
import { TheoryNote } from '@/components/atoms/TheoryNote';

export const PaletteGenerator: FC = () => {
  const [palette, setPalette] = useState(() => randomPalette(5) ?? []);
  const { copied, copy } = useClipboard();

  const regenerate = () => {
    const next = randomPalette(5);
    if (next) {
      setPalette(next);
    }
  };

  return (
    <div data-testid="palette-generator" className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <p className="text-base-content/50 text-sm">
          A random but harmonious five-color palette.
        </p>
        <button
          type="button"
          aria-label="Generate a new palette"
          className="btn btn-primary btn-sm"
          onClick={regenerate}>
          <FiShuffle />
          Generate
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {palette.map((hex) => (
          <Swatch
            key={hex}
            hex={hex}
            copied={copied === hex}
            onCopy={(value) => copy(value, value)}
          />
        ))}
      </div>
      <TheoryNote title="Palette Balance">
        A strong palette keeps colors balanced: a dominant hue for large areas,
        variations in lightness for hierarchy, and one or two accents drawn from
        a harmonizing spot on the wheel. Random palettes should be checked for
        contrast and for how they feel when more than two colors sit together.
      </TheoryNote>
    </div>
  );
};
PaletteGenerator.displayName = 'PaletteGenerator';
