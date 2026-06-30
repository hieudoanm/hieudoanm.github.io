'use client';

import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useMemo, useState } from 'react';
import {
  contrastRatio,
  formatHex,
  formatRatio,
  getLevels,
  hexToRgb,
} from './utils';

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
