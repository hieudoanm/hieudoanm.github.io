'use client';

import { FC, useEffect, useState } from 'react';
import { hexToCmyk, hexToHsv, parseColor } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { CopyRow } from '@/components/atoms/CopyRow';
import { TheoryNote } from '@/components/atoms/TheoryNote';

interface Row {
  label: string;
  value: string;
}

export const ColorConverter: FC<{
  baseColor: string;
  onColorChange: (hex: string) => void;
}> = ({ baseColor, onColorChange }) => {
  const { copied, copy } = useClipboard();
  const [query, setQuery] = useState(baseColor);
  const parsed = parseColor(baseColor);

  useEffect(() => {
    setQuery(baseColor);
  }, [baseColor]);

  const handleQuery = (value: string) => {
    setQuery(value);
    const result = parseColor(value);
    if (result) {
      onColorChange(result.hex);
    }
  };

  if (!parsed) {
    return null;
  }

  const hsv = hexToHsv(parsed.hex);
  const cmyk = hexToCmyk(parsed.hex);
  if (!hsv || !cmyk) {
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
    {
      label: 'HSV',
      value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
    },
    {
      label: 'CMYK',
      value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    },
  ];

  return (
    <div data-testid="color-converter" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-base-content/50">Pick</span>
          <input
            type="color"
            aria-label="Pick a color"
            className="h-9 w-14 cursor-pointer rounded border"
            value={parsed.hex}
            onChange={(event) => onColorChange(event.target.value)}
          />
        </label>
        <label className="flex flex-1 flex-col gap-1">
          <span className="text-base-content/50 text-xs">
            Paste a HEX, RGB or HSL color
          </span>
          <input
            type="text"
            aria-label="Paste a color"
            className="input input-bordered input-sm font-mono"
            placeholder="#6366f1, rgb(99, 102, 241), hsl(239, 84%, 67%)"
            value={query}
            onChange={(event) => handleQuery(event.target.value)}
          />
        </label>
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
      <TheoryNote title="Color Models">
        A color can be described by several coordinate systems. RGB is additive:
        screens mix red, green and blue light. CMYK is subtractive: printers
        overlay cyan, magenta, yellow and key (black) ink. HSL and HSV are
        perceptual — a hue angle, saturation and lightness or value. HEX is just
        a compact RGB encoding. Converting between models changes coordinates,
        not the color itself.
      </TheoryNote>
    </div>
  );
};
ColorConverter.displayName = 'ColorConverter';
