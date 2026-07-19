'use client';

import { FC, useState } from 'react';
import { colorTemperature, kelvinToHex } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { CopyRow } from '@/components/atoms/CopyRow';
import { TheoryNote } from '@/components/atoms/TheoryNote';

interface ClassificationInfo {
  label: string;
  badge: string;
  hint: string;
}

const CLASSIFICATIONS: Record<'warm' | 'cool' | 'neutral', ClassificationInfo> =
  {
    warm: {
      label: 'Warm',
      badge: 'badge-warning',
      hint: 'Hues around red, orange and yellow (0°–60° or 330°–360°).',
    },
    cool: {
      label: 'Cool',
      badge: 'badge-info',
      hint: 'Hues around green, blue and violet (60°–330°).',
    },
    neutral: {
      label: 'Neutral',
      badge: 'badge-neutral',
      hint: 'Low-saturation colors read as neither strongly warm nor cool.',
    },
  };

export const ColorTemperature: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [kelvin, setKelvin] = useState(4000);
  const { copied, copy } = useClipboard();
  const classification = colorTemperature(baseColor);
  const info = CLASSIFICATIONS[classification];
  const temperatureColor = kelvinToHex(kelvin);

  const rows = [
    { label: 'HEX', value: temperatureColor },
    { label: 'Kelvin', value: `${kelvin}K` },
  ];

  return (
    <div data-testid="color-temperature" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-base-content/50 text-xs">
          Active color temperature
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="border-base-300 h-10 w-10 shrink-0 rounded-lg border"
            style={{ backgroundColor: baseColor }}
            aria-label="Active color swatch"
          />
          <span className={`badge ${info.badge}`}>{info.label}</span>
          <p className="text-base-content/70 text-xs">{info.hint}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 text-sm">
          <span className="text-base-content/50">Kelvin</span>
          <input
            type="range"
            min={1000}
            max={10000}
            step={100}
            value={kelvin}
            aria-label="Color temperature"
            onChange={(event) => setKelvin(Number(event.target.value))}
            className="range range-primary range-xs flex-1"
          />
          <span className="text-base-content font-mono text-xs">{kelvin}K</span>
        </label>
        <div
          className="border-base-300 h-24 w-full rounded-xl border"
          style={{ backgroundColor: temperatureColor }}
          aria-label="Temperature preview"
        />
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <CopyRow
              key={row.label}
              label={row.label}
              value={row.value}
              swatch={temperatureColor}
              copied={copied}
              onCopy={(text) => copy(text, text)}
            />
          ))}
        </div>
      </div>
      <TheoryNote title="Color Temperature">
        In lighting, temperature is measured in Kelvin — candlelight (~2000K) is
        warm and orange, daylight (~6500K) is white, and shade or sky (~10000K)
        is cool and blue. In color theory, warm and cool also describe hue
        position: reds, oranges and yellows feel warm while greens, blues and
        violets feel cool.
      </TheoryNote>
    </div>
  );
};
ColorTemperature.displayName = 'ColorTemperature';
