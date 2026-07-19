'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { composite } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { TheoryNote } from '@/components/atoms/TheoryNote';

const OPACITIES = [1, 0.75, 0.5, 0.25, 0.1];
const BACKGROUNDS = [
  { label: 'On white', hex: '#ffffff' },
  { label: 'On black', hex: '#000000' },
];

export const OpacityOverlay: FC<{ baseColor: string }> = ({ baseColor }) => {
  const { copied, copy } = useClipboard();

  return (
    <div data-testid="opacity-overlay" className="flex flex-col gap-6">
      {BACKGROUNDS.map(({ label, hex }) => (
        <div key={label}>
          <h3 className="text-base-content/50 mb-2 text-xs font-medium uppercase">
            {label}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {OPACITIES.map((opacity) => {
              const result = composite(baseColor, hex, opacity);
              const percentage = Math.round(opacity * 100);
              return (
                <div
                  key={opacity}
                  className="border-base-300 flex items-center gap-3 overflow-hidden rounded-lg border">
                  <div
                    className="h-14 w-14 shrink-0"
                    style={{ backgroundColor: result }}
                    aria-label={`${label} at ${percentage}%`}
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-base-content/50 font-mono text-[10px]">
                      {percentage}%
                    </span>
                    <code className="text-base-content truncate font-mono text-xs uppercase">
                      {result}
                    </code>
                    <button
                      type="button"
                      aria-label={`Copy ${result}`}
                      className="btn btn-ghost btn-xs mt-1 w-fit"
                      onClick={() => copy(result, result)}>
                      {copied === result ? (
                        <FiCheck className="text-success" />
                      ) : (
                        <FiCopy className="text-base-content/50" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <TheoryNote title="Opacity and Alpha Compositing">
        On a screen every rendered color is opaque: a 50% translucent red over
        white actually shows the weighted average of the two, computed per
        channel as <code>result = fg × α + bg × (1 − α)</code>. Lowering opacity
        never reveals a background by itself — it blends the color with whatever
        sits underneath.
      </TheoryNote>
    </div>
  );
};
OpacityOverlay.displayName = 'OpacityOverlay';
