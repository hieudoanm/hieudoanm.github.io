'use client';

import { FC } from 'react';
import { shade, tint, tone } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { Swatch } from './Swatch';
import { TheoryNote } from './TheoryNote';

const STEPS = [0, 0.2, 0.4, 0.6, 0.8, 1];

interface Scale {
  label: string;
  colors: string[];
}

export const TintShadeTone: FC<{ baseColor: string }> = ({ baseColor }) => {
  const { copied, copy } = useClipboard();

  const scales: Scale[] = [
    {
      label: 'Tints (add white)',
      colors: STEPS.map((w) => tint(baseColor, w)),
    },
    {
      label: 'Shades (add black)',
      colors: STEPS.map((w) => shade(baseColor, w)),
    },
    { label: 'Tones (add gray)', colors: STEPS.map((w) => tone(baseColor, w)) },
  ];

  return (
    <div data-testid="tint-shade-tone" className="flex flex-col gap-5">
      {scales.map(({ label, colors }) => (
        <div key={label}>
          <h3 className="text-base-content/50 mb-2 text-xs font-medium uppercase">
            {label}
          </h3>
          <div className="flex gap-3">
            {colors.map((hex) => (
              <Swatch
                key={hex}
                hex={hex}
                copied={copied === hex}
                onCopy={(value) => copy(value, value)}
              />
            ))}
          </div>
        </div>
      ))}
      <TheoryNote title="Tint, Shade and Tone">
        A tint mixes a color with white to make it lighter and pastel, a shade
        mixes it with black to make it darker, and a tone mixes it with gray to
        mute it. All three keep the same hue, changing only how much light or
        gray the color carries.
      </TheoryNote>
    </div>
  );
};
TintShadeTone.displayName = 'TintShadeTone';
