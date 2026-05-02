import { hex2hsl, hex2oklch, hex2rgb } from '@hieudoanm/utils/colors/code/hex';
import {
  getBrightness,
  randomHexColorCode,
} from '@hieudoanm/utils/colors/utils';
import { FC, useEffect, useState } from 'react';

const INITIAL_COLOR = '#171717';

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        update(randomHexColorCode());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isDark = getBrightness(hex);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card border-base-300 w-full max-w-sm border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div
          className="card-body gap-5 p-6"
          style={{
            backgroundColor: hex,
            color: isDark ? '#ffffff' : '#101828',
          }}>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">Colors</h2>
              <p className="mt-0.5 font-mono text-[10px] tracking-widest uppercase opacity-40">
                HEX · RGB · HSL · OKLCH
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update(randomHexColorCode())}
                className="btn btn-ghost btn-xs font-mono tracking-widest opacity-60 hover:opacity-100"
                style={{ color: 'inherit', borderColor: 'currentColor' }}>
                Random
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base opacity-60 hover:opacity-100"
                style={{ color: 'inherit' }}>
                ✕
              </button>
            </div>
          </div>

          {/* Color preview + picker */}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={hex}
              onChange={(e) => update(e.target.value)}
              className="h-12 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
            />
            <div className="flex-1">
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-40">
                HEX
              </p>
              <input
                type="text"
                value={hex}
                onChange={(e) => update(e.target.value)}
                className="w-full bg-transparent font-mono text-2xl font-black tracking-tight uppercase focus:outline-none"
                style={{ color: 'inherit' }}
                maxLength={7}
              />
            </div>
          </div>

          {/* Color values */}
          <div
            className="flex flex-col divide-y rounded-xl border border-dotted"
            style={{ borderColor: 'currentColor', opacity: 0.6 }}>
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

          <p className="text-center font-mono text-[10px] tracking-widest uppercase opacity-20">
            Click outside to close · Space for random
          </p>
        </div>
      </div>
    </div>
  );
};
