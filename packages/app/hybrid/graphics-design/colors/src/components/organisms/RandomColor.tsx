'use client';

import { FC, useState } from 'react';
import { FiShuffle } from 'react-icons/fi';
import { randomColor } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { CopyRow } from '@/components/atoms/CopyRow';
import { TheoryNote } from '@/components/atoms/TheoryNote';

interface Row {
  label: string;
  value: string;
}

export const RandomColor: FC = () => {
  const [color, setColor] = useState(() => randomColor() ?? '#6366f1');
  const [locked, setLocked] = useState(false);
  const { copied, copy } = useClipboard();

  const roll = () => {
    const next = randomColor();
    if (!next) {
      return;
    }
    setColor(next);
    setLocked(false);
  };

  const hex = locked ? 'Locked — roll again to change' : color;

  const rows: Row[] = [
    { label: 'HEX', value: color },
    ...(locked
      ? []
      : [
          {
            label: 'RGB',
            value: (() => {
              const c = color.slice(1);
              const r = parseInt(c.slice(0, 2), 16);
              const g = parseInt(c.slice(2, 4), 16);
              const b = parseInt(c.slice(4, 6), 16);
              return `rgb(${r}, ${g}, ${b})`;
            })(),
          },
        ]),
  ];

  return (
    <div data-testid="random-color" className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="border-base-300 h-24 w-24 shrink-0 rounded-xl border"
          style={{ backgroundColor: color }}
          aria-label="Random color preview"
        />
        <div className="flex flex-col gap-3">
          <button type="button" className="btn btn-primary" onClick={roll}>
            <FiShuffle />
            Random Color
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              aria-label="Lock color"
              checked={locked}
              onChange={(event) => setLocked(event.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-base-content/70">Lock</span>
          </label>
        </div>
      </div>
      <p className="text-base-content/50 text-xs">{hex}</p>
      {!locked && (
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <CopyRow
              key={row.label}
              label={row.label}
              value={row.value}
              swatch={color}
              copied={copied}
              onCopy={(text) => copy(text, text)}
            />
          ))}
        </div>
      )}
      <TheoryNote title="Random Color">
        A uniform random pick is just as likely to return a washed-out pale
        yellow as a vivid magenta. For UI work, rolling and re-rolling while
        judging both the hue and how it reads on the surrounding background is
        often faster than tuning sliders by hand.
      </TheoryNote>
    </div>
  );
};
RandomColor.displayName = 'RandomColor';
