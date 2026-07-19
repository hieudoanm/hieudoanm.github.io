'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { shadesAndTints } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { TheoryNote } from '@/components/atoms/TheoryNote';

export const CssScaleExporter: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [count, setCount] = useState(9);
  const [prefix, setPrefix] = useState('brand');
  const { copied, copy } = useClipboard();
  const scale = shadesAndTints(baseColor, count);
  const mid = (count - 1) / 2;

  const css = scale
    .map((hex, index) => {
      const name = index < mid ? `shade-${mid - index}` : `tint-${index - mid}`;
      const token = `${prefix}-${name}`;
      return `--color-${token}: ${hex};`;
    })
    .join('\n');

  return (
    <div data-testid="css-scale-exporter" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-base-content/50 text-xs">Steps</span>
          <input
            type="range"
            min={5}
            max={13}
            step={2}
            value={count}
            aria-label="Scale steps"
            onChange={(event) => setCount(Number(event.target.value))}
            className="range range-primary range-xs w-40"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base-content/50 text-xs">Prefix</span>
          <input
            type="text"
            aria-label="Variable prefix"
            value={prefix}
            onChange={(event) => setPrefix(event.target.value)}
            className="input input-bordered input-sm font-mono"
          />
        </label>
      </div>
      <div className="flex items-start gap-3">
        <pre className="bg-base-100 border-base-300 flex-1 overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed">
          <code>{css}</code>
        </pre>
        <button
          type="button"
          aria-label="Copy CSS"
          className="btn btn-primary btn-sm"
          onClick={() => copy('css', css)}>
          {copied === 'css' ? <FiCheck className="text-success" /> : <FiCopy />}
          Copy
        </button>
      </div>
      <TheoryNote title="Tokenizing a Scale">
        A consistent color scale becomes a set of CSS custom properties. Naming
        each step by tint or shade — <code>brand-tint-1</code> through{' '}
        <code>brand-shade-1</code> — keeps tokens predictable so components can
        reference a single palette instead of hard-coded hex values.
      </TheoryNote>
    </div>
  );
};
CssScaleExporter.displayName = 'CssScaleExporter';
