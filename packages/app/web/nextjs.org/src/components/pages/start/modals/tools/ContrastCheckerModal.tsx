'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const num = Number.parseInt(clean, 16);
  if (Number.isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (
    0.2126 * linearize(rgb.r) +
    0.7152 * linearize(rgb.g) +
    0.0722 * linearize(rgb.b)
  );
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

type Level = { pass: boolean; label: string };

function getLevels(fg: string, bg: string): Level[] {
  const ratio = contrastRatio(fg, bg);
  return [
    { pass: ratio >= 3, label: 'AA Large (≥ 3:1)' },
    { pass: ratio >= 4.5, label: 'AA Normal (≥ 4.5:1)' },
    { pass: ratio >= 4.5, label: 'AAA Large (≥ 4.5:1)' },
    { pass: ratio >= 7, label: 'AAA Normal (≥ 7:1)' },
  ];
}

function formatHex(input: string): string {
  const clean = input.replace('#', '');
  if (clean.length === 3) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`;
  }
  return `#${clean.padEnd(6, '0').slice(0, 6)}`;
}

export const ContrastCheckerModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [fgInput, setFgInput] = useState('#ffffff');
  const [bgInput, setBgInput] = useState('#000000');

  const fg = formatHex(fgInput);
  const bg = formatHex(bgInput);

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const levels = useMemo(() => getLevels(fg, bg), [fg, bg]);

  const valid = hexToRgb(fg) && hexToRgb(bg);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Color Contrast Checker"
      subtitle={valid ? formatRatio(ratio) : ''}
      footerNote="Click outside to close · Paste any hex color"
      size="max-w-sm">
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl border p-6"
          style={{
            backgroundColor: bg,
            color: fg,
            borderColor: 'oklch(0.5 0 0 / 0.2)',
          }}>
          <p className="text-center text-2xl font-black tracking-tight">
            Sample Text
          </p>
          <p className="text-center text-xs leading-relaxed opacity-75">
            The quick brown fox jumps over the lazy dog. 1234567890
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1">
            <label className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Foreground
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFgInput(e.target.value)}
                className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border-0 p-0"
              />
              <input
                type="text"
                value={fgInput}
                onChange={(e) => setFgInput(e.target.value)}
                className="input input-bordered input-xs flex-1 font-mono text-xs tracking-wider"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBgInput(e.target.value)}
                className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border-0 p-0"
              />
              <input
                type="text"
                value={bgInput}
                onChange={(e) => setBgInput(e.target.value)}
                className="input input-bordered input-xs flex-1 font-mono text-xs tracking-wider"
              />
            </div>
          </div>
        </div>

        {valid && (
          <div className="border-base-300 divide-base-300 flex flex-col divide-y overflow-hidden rounded-xl border">
            {levels.map(({ pass, label }) => (
              <div
                key={label}
                className={`flex items-center justify-between px-3 py-2 ${
                  pass ? 'text-success' : 'text-base-content/40'
                }`}>
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  {label}
                </span>
                <span className="text-sm font-bold">
                  {pass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="text-base-content/40 text-center font-mono text-[10px] tracking-widest">
          WCAG 2.1 AA &amp; AAA
        </div>
      </div>
    </ModalWrapper>
  );
};
ContrastCheckerModal.displayName = 'ContrastCheckerModal';
