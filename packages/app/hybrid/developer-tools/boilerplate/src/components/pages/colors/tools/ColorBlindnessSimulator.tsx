'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { ColorBlindnessType, simulateColorBlindness } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

const TYPES: {
  value: ColorBlindnessType;
  label: string;
  description: string;
}[] = [
  {
    value: 'protanopia',
    label: 'Protanopia',
    description: 'Red-blind (L-cone)',
  },
  {
    value: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'Green-blind (M-cone)',
  },
  {
    value: 'tritanopia',
    label: 'Tritanopia',
    description: 'Blue-blind (S-cone)',
  },
];

export const ColorBlindnessSimulator: FC<{ baseColor: string }> = ({
  baseColor,
}) => {
  const { copied, copy } = useClipboard();

  return (
    <div
      data-testid="color-blindness"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {TYPES.map(({ value, label, description }) => {
        const simulated = simulateColorBlindness(baseColor, value);
        return (
          <div key={value} className="border-base-300 rounded-xl border">
            <header className="border-base-300 border-b px-4 py-3">
              <h3 className="text-base-content text-sm font-medium">{label}</h3>
              <p className="text-base-content/50 text-xs">{description}</p>
            </header>
            <div className="flex items-center gap-3 p-4">
              <div
                className="h-14 w-14 shrink-0 rounded-lg border"
                style={{ backgroundColor: baseColor }}
                aria-label={`${label} original`}
              />
              <span className="text-base-content/30 text-xl">→</span>
              <button
                type="button"
                aria-label={`Copy ${simulated}`}
                className="border-base-300 flex flex-1 items-center gap-3 overflow-hidden rounded-lg border"
                onClick={() => copy(simulated, simulated)}>
                <div
                  className="h-14 flex-1"
                  style={{ backgroundColor: simulated }}
                />
                <code className="text-base-content/70 pr-2 font-mono text-[10px] uppercase">
                  {simulated}
                </code>
                {copied === simulated ? (
                  <FiCheck className="text-success shrink-0" />
                ) : (
                  <FiCopy className="text-base-content/40 shrink-0" />
                )}
              </button>
            </div>
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <TheoryNote title="Color Vision">
          Human color vision uses three cone types: L (long, red), M (medium,
          green) and S (short, blue). Protanopia lacks L cones, deuteranopia
          lacks M cones and tritanopia lacks S cones. The simulator multiplies
          the RGB channels by a matrix that approximates the lost response so
          you can preview how the palette appears to others.
        </TheoryNote>
      </div>
    </div>
  );
};
ColorBlindnessSimulator.displayName = 'ColorBlindnessSimulator';
