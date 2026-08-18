'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy, FiShuffle } from 'react-icons/fi';
import { parseColor, randomColor } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

interface Variant {
  label: string;
  value: string;
}

export const RandomColor: FC = () => {
  const [hex, setHex] = useState(() => randomColor());
  const { copied, copy } = useClipboard();
  const parsed = parseColor(hex);

  const variants: Variant[] = [
    { label: 'HEX', value: parsed?.hex ?? hex },
    {
      label: 'RGB',
      value: parsed
        ? `rgb(${parsed.rgb.r}, ${parsed.rgb.g}, ${parsed.rgb.b})`
        : hex,
    },
    {
      label: 'HSL',
      value: parsed
        ? `hsl(${parsed.hsl.h}, ${parsed.hsl.s}%, ${parsed.hsl.l}%)`
        : hex,
    },
  ];

  const generate = () => {
    setHex(randomColor());
  };

  return (
    <div data-testid="random-color" className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="h-20 w-20 rounded-xl border"
          style={{ backgroundColor: hex }}
          aria-label="Random color preview"
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={generate}>
          <FiShuffle />
          Generate
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {variants.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="text-base-content/50 w-12 text-xs font-medium uppercase">
              {row.label}
            </span>
            <code className="text-base-content flex-1 text-sm">
              {row.value}
            </code>
            <button
              type="button"
              aria-label={`Copy ${row.label}`}
              className="btn btn-ghost btn-sm"
              onClick={() => copy(row.value, row.value)}>
              {copied === row.value ? (
                <FiCheck className="text-success" />
              ) : (
                <FiCopy className="text-base-content/50" />
              )}
            </button>
          </div>
        ))}
      </div>
      <TheoryNote title="Randomness in HSL">
        Generating a color in HSL space instead of random RGB keeps the result
        vivid: hue is random around the wheel while saturation and lightness are
        constrained to readable ranges. Random RGB often lands in dull, muddy
        grays or colors too close to black or white.
      </TheoryNote>
    </div>
  );
};
RandomColor.displayName = 'RandomColor';
