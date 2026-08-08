'use client';

import { FC, useState } from 'react';
import { mixColors, parseColor } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { CopyRow } from './CopyRow';
import { TheoryNote } from './TheoryNote';

interface Row {
  label: string;
  value: string;
}

export const ColorMixer: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [first, setFirst] = useState(baseColor);
  const [second, setSecond] = useState('#0000ff');
  const [weight, setWeight] = useState(50);
  const { copied, copy } = useClipboard();
  const mixed = mixColors(first, second, weight / 100);
  const parsed = parseColor(mixed);

  if (!parsed) {
    return null;
  }

  const rows: Row[] = [
    { label: 'HEX', value: parsed.hex },
    {
      label: 'RGB',
      value: `rgb(${parsed.rgb.r}, ${parsed.rgb.g}, ${parsed.rgb.b})`,
    },
    {
      label: 'HSL',
      value: `hsl(${parsed.hsl.h}, ${parsed.hsl.s}%, ${parsed.hsl.l}%)`,
    },
  ];

  return (
    <div data-testid="color-mixer" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-base-content/50">First</span>
          <input
            type="color"
            aria-label="First color"
            className="h-9 w-14 cursor-pointer rounded border"
            value={first}
            onChange={(event) => setFirst(event.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-base-content/50">Second</span>
          <input
            type="color"
            aria-label="Second color"
            className="h-9 w-14 cursor-pointer rounded border"
            value={second}
            onChange={(event) => setSecond(event.target.value)}
          />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <span className="text-base-content/50">Mix</span>
          <input
            type="range"
            min={0}
            max={100}
            value={weight}
            aria-label="Mix weight"
            onChange={(event) => setWeight(Number(event.target.value))}
            className="range range-primary range-xs w-40"
          />
          <span className="text-base-content font-mono text-xs">{weight}%</span>
        </label>
        <div
          className="border-base-300 h-10 w-16 rounded-lg border"
          style={{ backgroundColor: mixed }}
          aria-label="Mixed color preview"
        />
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <CopyRow
            key={row.label}
            label={row.label}
            value={row.value}
            swatch={parsed.hex}
            copied={copied}
            onCopy={(text) => copy(text, text)}
          />
        ))}
      </div>
      <TheoryNote title="Color Mixing">
        Mixing on screen is additive: the result averages the two colors’ RGB
        channels, weighted by the mix percentage, so at 50% the output is
        exactly halfway between them. Paint mixes subtractively because pigments
        absorb light, so RGB averages do not predict what blending physical
        paints would produce.
      </TheoryNote>
    </div>
  );
};
ColorMixer.displayName = 'ColorMixer';
