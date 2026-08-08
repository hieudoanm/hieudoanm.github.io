'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { hexToRgb, shadesAndTints } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { TheoryNote } from './TheoryNote';

const LABELS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

export const CssScaleExporter: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [color, setColor] = useState(baseColor);
  const { copied, copy } = useClipboard();

  if (!hexToRgb(color)) {
    return null;
  }

  const rows = shadesAndTints(color, LABELS.length)
    .reverse()
    .map((hex, index) => ({ label: LABELS[index], hex }));
  const css = rows.map((row) => `--color-${row.label}: ${row.hex};`).join('\n');

  return (
    <div data-testid="css-scale-exporter" className="flex flex-col gap-5">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-base-content/50">Color</span>
        <input
          type="color"
          aria-label="Scale color"
          className="h-9 w-14 cursor-pointer rounded border"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {rows.map(({ label, hex }) => (
          <div
            key={label}
            className="border-base-300 flex flex-col overflow-hidden rounded-lg border"
            style={{ width: '2.5rem' }}>
            <div className="h-12" style={{ backgroundColor: hex }} />
            <span className="bg-base-100 text-base-content/60 text-center text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map(({ label, hex }) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className="border-base-300 h-6 w-6 shrink-0 rounded border"
              style={{ backgroundColor: hex }}
            />
            <code className="text-base-content flex-1 font-mono text-xs">
              --color-{label}: {hex};
            </code>
            <button
              type="button"
              aria-label={`Copy --color-${label}`}
              className="btn btn-ghost btn-xs"
              onClick={() =>
                copy(`--color-${label}`, `--color-${label}: ${hex};`)
              }>
              {copied === `--color-${label}` ? (
                <FiCheck className="text-success" />
              ) : (
                <FiCopy className="text-base-content/50" />
              )}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Copy CSS scale"
        className="btn btn-primary btn-sm self-start"
        onClick={() => copy('css-scale', css)}>
        {copied === 'css-scale' ? (
          <FiCheck className="text-success" />
        ) : (
          <FiCopy />
        )}
        Copy CSS
      </button>
      <TheoryNote title="Scale Design">
        The base color is the mid step (500). Steps 50–400 are tints blended
        progressively toward white, and 600–900 are shades blended toward black.
        Keeping every step on the same hue produces consistent, predictable
        contrast increments across an interface.
      </TheoryNote>
    </div>
  );
};
CssScaleExporter.displayName = 'CssScaleExporter';
