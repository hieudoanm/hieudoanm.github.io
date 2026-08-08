'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { shadesAndTints } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

export const ShadesTints: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [count, setCount] = useState(9);
  const { copied, copy } = useClipboard();
  const scale = shadesAndTints(baseColor, count);
  const mid = (count - 1) / 2;

  return (
    <div data-testid="shades-tints" className="flex flex-col gap-4">
      <label className="flex items-center gap-3 text-sm">
        <span className="text-base-content/50">Steps</span>
        <input
          type="range"
          min={5}
          max={13}
          step={2}
          value={count}
          aria-label="Shade steps"
          onChange={(event) => setCount(Number(event.target.value))}
          className="range range-primary range-xs w-40"
        />
        <span className="text-base-content font-mono text-xs">{count}</span>
      </label>
      <div className="flex flex-col gap-2">
        {scale.map((hex, index) => {
          const label =
            index < mid
              ? `shade ${mid - index}`
              : index > mid
                ? `tint ${index - mid}`
                : 'base';
          return (
            <button
              key={`${index}-${hex}`}
              type="button"
              aria-label={`Copy ${hex}`}
              onClick={() => copy(hex, hex)}
              className="border-base-300 flex items-center gap-3 overflow-hidden rounded-lg border">
              <div
                className="h-10 w-16 shrink-0"
                style={{ backgroundColor: hex }}
              />
              <code className="text-base-content font-mono text-xs uppercase">
                {hex}
              </code>
              <span className="text-base-content/40 text-xs">{label}</span>
              <span className="mr-3 ml-auto">
                {copied === hex ? (
                  <FiCheck className="text-success" />
                ) : (
                  <FiCopy className="text-base-content/40" />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <TheoryNote title="Shades and Tints">
        The middle of the scale keeps the base color. Each step toward black is
        a shade and each step toward white is a tint, blended in equal
        increments so the steps look evenly spaced. Hue is preserved throughout
        — only lightness changes.
      </TheoryNote>
    </div>
  );
};
ShadesTints.displayName = 'ShadesTints';
