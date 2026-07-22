'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

type Align = 'left' | 'center' | 'right';

const PRESETS = [
  'Breaking Bad',
  'Walter White',
  'Jesse Pinkman',
  'Saul Goodman',
  'Gustavo Fring',
];

const Preview: FC<{
  align: Align;
  isColored: boolean;
  isMultiline: boolean;
  text: string;
}> = ({ align, isColored, isMultiline, text }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width,
      h = c.height;

    if (isColored) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#0d3b0d');
      grad.addColorStop(0.5, '#1a5c1a');
      grad.addColorStop(1, '#2d8a2d');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#1a1a1a';
    }
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = isColored ? '#88c040' : '#ccc';
    ctx.textAlign =
      align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
    ctx.textBaseline = 'middle';

    const lines = isMultiline ? text.split('\n') : [text];
    const fs = Math.min(
      48,
      w /
        Math.max(
          1,
          lines.reduce((a, l) => Math.max(a, l.length), 1)
        )
    );
    ctx.font = `bold ${fs}px sans-serif`;

    const lineH = fs * 1.4;
    const totalH = lines.length * lineH;
    const startY = (h - totalH) / 2 + lineH / 2;

    lines.forEach((line, i) => {
      const x = align === 'left' ? 20 : align === 'right' ? w - 20 : w / 2;
      ctx.fillText(line, x, startY + i * lineH);
    });

    ctx.fillStyle = isColored ? '#5a8a2a' : '#555';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Breaking Bad', w / 2, h - 15);
  }, [align, isColored, isMultiline, text]);

  return (
    <canvas
      ref={ref}
      width={400}
      height={200}
      className="w-full max-w-md rounded-lg"
    />
  );
};

export const BreakingBadTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [{ align, isColored, isMultiline, name }, setState] = useState<{
    align: Align;
    isColored: boolean;
    isMultiline: boolean;
    name: string;
  }>({
    align: 'center',
    isColored: true,
    isMultiline: false,
    name: 'Breaking Bad',
  });
  const set = (
    patch: Partial<{
      align: Align;
      isColored: boolean;
      isMultiline: boolean;
      name: string;
    }>
  ) => setState((p) => ({ ...p, ...patch }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            className={`btn btn-xs ${name === preset ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => set({ name: preset })}>
            {preset}
          </button>
        ))}
      </div>
      <input
        placeholder="✨ Your Name"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => set({ name: e.target.value })}
      />
      <div className="flex flex-wrap items-center gap-4">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isColored}
            className="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isColored: e.target.checked })}
          />
          Colored
        </label>
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isMultiline}
            className="toggle toggle-primary toggle-sm"
            onChange={(e) => set({ isMultiline: e.target.checked })}
          />
          Multiline
        </label>
        {isMultiline && (
          <div className="join">
            {(['left', 'center', 'right'] as Align[]).map((a) => (
              <button
                key={a}
                type="button"
                className={`join-item btn btn-sm btn-soft ${align === a ? 'btn-primary' : ''}`}
                onClick={() => set({ align: a })}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="bg-base-200 flex min-h-40 items-center justify-center overflow-auto rounded-xl p-4">
        <Preview
          align={align}
          isColored={isColored}
          isMultiline={isMultiline}
          text={name}
        />
      </div>
    </div>
  );
};
BreakingBadTool.displayName = 'BreakingBadTool';
