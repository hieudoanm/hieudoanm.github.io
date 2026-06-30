import {
  brightness,
  hex2hsl,
  hex2oklch,
  hex2rgb,
  randomHex,
} from '@lodashx/ts';
import { FC, useEffect, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import {
  TAILWIND_COLORS,
  SHADES,
  COLOR_NAMES,
  INITIAL_COLOR,
} from './constants';

export const ColorsModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [{ hex, hsl, rgb, oklch }, setState] = useState({
    hex: INITIAL_COLOR,
    hsl: hex2hsl(INITIAL_COLOR),
    rgb: hex2rgb(INITIAL_COLOR),
    oklch: hex2oklch(INITIAL_COLOR),
  });
  const update = (newHex: string) =>
    setState({
      hex: newHex,
      hsl: hex2hsl(newHex),
      rgb: hex2rgb(newHex),
      oklch: hex2oklch(newHex),
    });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        update(randomHex());
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Colors"
      subtitle="HEX · RGB · HSL · OKLCH"
      footerNote="Click outside to close · Space for random">
      <button
        onClick={() => update(randomHex())}
        className="btn btn-ghost btn-xs font-mono tracking-widest opacity-60 hover:opacity-100">
        Random
      </button>
      <div className="border-base-300 flex items-center gap-3 rounded-xl border p-4 transition-colors duration-200">
        <input
          type="color"
          value={hex}
          onChange={(e) => update(e.target.value)}
          className="h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-lg border-0 p-0"
        />
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 font-mono text-[10px] tracking-widest uppercase">
            HEX
          </p>
          <input
            type="text"
            value={hex}
            onChange={(e) => update(e.target.value)}
            className="w-full bg-transparent font-mono text-2xl font-black tracking-tight uppercase focus:outline-none"
            maxLength={7}
          />
        </div>
      </div>
      <div className="divide-base-300 border-base-300 flex flex-col divide-y rounded-xl border">
        {[
          { label: 'RGB', value: `rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})` },
          { label: 'HSL', value: `hsl(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%)` },
          {
            label: 'OKLCH',
            value: `oklch(${oklch?.l}, ${oklch?.c}, ${oklch?.h})`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              {label}
            </span>
            <span className="font-mono text-sm font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] tracking-widest uppercase opacity-40">
          Tailwind Palette
        </p>
        <div className="grid grid-cols-[4rem_repeat(11,1fr)] gap-0.5">
          <div />
          {SHADES.map((shade) => (
            <div
              key={shade}
              className="pb-1 text-center font-mono text-[8px] leading-none opacity-30">
              {shade === 50 ? '50' : shade / 100}
            </div>
          ))}
        </div>
        <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto pr-1">
          {COLOR_NAMES.map((name) => (
            <div
              key={name}
              className="grid grid-cols-[4rem_repeat(11,1fr)] items-center gap-0.5">
              <span className="truncate pr-1 font-mono text-[10px] capitalize opacity-50">
                {name}
              </span>
              {SHADES.map((shade) => {
                const swatchHex = TAILWIND_COLORS[name][shade];
                const isActive = hex.toLowerCase() === swatchHex.toLowerCase();
                return (
                  <button
                    key={shade}
                    title={`${name}-${shade}: ${swatchHex}`}
                    onClick={() => update(swatchHex)}
                    className="relative h-4 w-full rounded-sm transition-transform hover:z-10 hover:scale-125"
                    style={{
                      backgroundColor: swatchHex,
                      outline: isActive
                        ? '2px solid oklch(0.6 0.15 250)'
                        : 'none',
                      outlineOffset: '1px',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};
ColorsModal.displayName = 'ColorsModal';
