'use client';

import { FC } from 'react';
import { simulateColorBlindness } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { Swatch } from '@/components/atoms/Swatch';
import { TheoryNote } from '@/components/atoms/TheoryNote';

const VARIANTS = [
  {
    key: 'protanopia',
    label: 'Protanopia (red-blind)',
    description: 'Lacks long-wavelength (red) cones. Red and green confuse.',
  },
  {
    key: 'deuteranopia',
    label: 'Deuteranopia (green-blind)',
    description:
      'Lacks medium-wavelength (green) cones. The most common red-green type.',
  },
  {
    key: 'tritanopia',
    label: 'Tritanopia (blue-blind)',
    description:
      'Lacks short-wavelength (blue) cones. Blue and yellow confuse.',
  },
];

type VariantKey = 'protanopia' | 'deuteranopia' | 'tritanopia';

export const ColorBlindnessSimulator: FC<{ baseColor: string }> = ({
  baseColor,
}) => {
  const { copied, copy } = useClipboard();
  const original = baseColor;

  return (
    <div
      data-testid="color-blindness-simulator"
      className="flex flex-col gap-6">
      <div>
        <h3 className="text-base-content/50 mb-2 text-xs font-medium uppercase">
          Original
        </h3>
        <div className="flex max-w-xs gap-3">
          <Swatch
            hex={original}
            copied={copied === original}
            onCopy={(value) => copy(value, value)}
          />
        </div>
      </div>
      {VARIANTS.map(({ key, label, description }) => {
        const simulated = simulateColorBlindness(original, key as VariantKey);
        return (
          <div key={key}>
            <h3 className="text-base-content/50 mb-1 text-xs font-medium uppercase">
              {label}
            </h3>
            <p className="text-base-content/60 mb-2 text-xs">{description}</p>
            <div className="flex max-w-xs gap-3">
              <Swatch
                hex={simulated}
                copied={copied === simulated}
                onCopy={(value) => copy(value, value)}
              />
            </div>
          </div>
        );
      })}
      <TheoryNote title="Color Vision Deficiency">
        Common deficiencies come from missing cones in the retina: protanopia
        lacks red cones, deuteranopia lacks green cones, and tritanopia lacks
        blue cones. Simulators map colors to how they appear under each
        condition — pairs that look different to a typical viewer can collapse
        for someone affected, so rely on more than hue to convey meaning.
      </TheoryNote>
    </div>
  );
};
ColorBlindnessSimulator.displayName = 'ColorBlindnessSimulator';
