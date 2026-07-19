'use client';

import type { FC } from 'react';

/**
 * A row of fixed-width slots, used by the array-backed structures (array,
 * stack, queue, hash table) where cells may be empty.
 */
export const SlotGrid: FC<{
  items: readonly (number | null)[];
  highlight?: readonly number[];
  tone?: 'primary' | 'info' | 'success';
}> = ({ items, highlight = [], tone = 'primary' }) => {
  const toneClass =
    tone === 'info'
      ? 'border-info/60 bg-info/20'
      : tone === 'success'
        ? 'border-success/60 bg-success/20'
        : 'border-primary/60 bg-primary/20';
  return (
    <div className="flex flex-wrap items-center gap-1" data-testid="slot-grid">
      {items.map((value, i) => {
        const lit = highlight.includes(i);
        return (
          <div
            key={i}
            data-testid={`slot-${i}`}
            data-value={value ?? 'empty'}
            className={`flex h-10 w-12 items-center justify-center rounded border font-mono text-sm ${
              value === null
                ? 'text-base-content/25 border-base-content/10 border-dashed'
                : lit
                  ? toneClass
                  : 'border-base-content/20 bg-base-200'
            }`}>
            {value ?? '·'}
          </div>
        );
      })}
    </div>
  );
};

/** A monospace block for showing tree or table internals as text. */
export const Pre: FC<{ lines: readonly string[]; title?: string }> = ({
  lines,
  title,
}) => (
  <div className="flex flex-col gap-1" data-testid="pre">
    {title && (
      <span className="text-base-content/50 text-xs font-medium">{title}</span>
    )}
    <pre className="bg-base-200/60 overflow-x-auto rounded p-3 font-mono text-xs leading-relaxed">
      {lines.join('\n')}
    </pre>
  </div>
);
