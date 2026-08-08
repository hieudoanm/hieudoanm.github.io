'use client';

import { FC, MouseEvent, useState } from 'react';
import { hexToHsl, hexToRgb, hslToHex, luminance } from '../utils/colors';
import { useClipboard } from '../hooks/useClipboard';
import { CopyRow } from './CopyRow';
import { Swatch } from './Swatch';
import { TheoryNote } from './TheoryNote';

const SIZE = 224;
const RING_WIDTH = 28;
const RING_MID = SIZE / 2 - RING_WIDTH / 2;

const normalize = (hue: number): number => ((hue % 360) + 360) % 360;

interface HarmonyRow {
  label: string;
  hues: number[];
}

const harmonyRows = (hue: number): HarmonyRow[] => [
  { label: 'Complementary', hues: [normalize(hue + 180)] },
  {
    label: 'Split-complementary',
    hues: [normalize(hue + 150), normalize(hue + 210)],
  },
  { label: 'Analogous', hues: [normalize(hue - 30), normalize(hue + 30)] },
  { label: 'Triadic', hues: [normalize(hue + 120), normalize(hue + 240)] },
];

const wheelGradient =
  'conic-gradient(hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))';

export const ColorWheel: FC<{ baseColor: string }> = ({ baseColor }) => {
  const initial = hexToHsl(baseColor);
  const [hue, setHue] = useState(initial?.h ?? 0);
  const [touched, setTouched] = useState(false);
  const { copied, copy } = useClipboard();

  if (!initial) {
    return null;
  }

  const active = touched
    ? hslToHex({ h: hue, s: initial.s, l: initial.l })
    : baseColor;
  const rgb = hexToRgb(active);
  const textColor = rgb && luminance(rgb) > 0.5 ? '#000000' : '#ffffff';

  const pickHue = (value: number): void => {
    setHue(value);
    setTouched(true);
  };

  const position = (angle: number): { left: number; top: number } => {
    const radians = (angle * Math.PI) / 180;
    return {
      left: SIZE / 2 + RING_MID * Math.sin(radians),
      top: SIZE / 2 - RING_MID * Math.cos(radians),
    };
  };

  const handleWheelClick = (event: MouseEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance < SIZE / 2 - RING_WIDTH || distance > SIZE / 2) {
      return;
    }
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) {
      angle += 360;
    }
    pickHue(Math.round(angle));
  };

  const markers = [
    { id: 'active', hue },
    ...harmonyRows(hue).flatMap(({ label, hues }) =>
      hues.map((h) => ({ id: `${label}-${h}`, hue: h }))
    ),
  ];

  return (
    <div data-testid="color-wheel" className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <div
          role="button"
          aria-label="Hue wheel"
          className="relative shrink-0 cursor-pointer rounded-full"
          style={{ width: SIZE, height: SIZE, background: wheelGradient }}
          onClick={handleWheelClick}>
          {markers.map(({ id, hue: markerHue }) => {
            const { left, top } = position(markerHue);
            const hex =
              id === 'active'
                ? active
                : hslToHex({ h: markerHue, s: 100, l: 50 });
            return (
              <span
                key={id}
                aria-label={`${id} at ${markerHue}°`}
                className="absolute h-3 w-3 rounded-full border-2 border-white shadow"
                style={{
                  left,
                  top,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: hex,
                  zIndex: 10,
                }}
              />
            );
          })}
          <div
            className="absolute flex items-center justify-center rounded-full border-2 border-white"
            style={{
              inset: RING_WIDTH,
              backgroundColor: active,
              color: textColor,
            }}>
            <span className="font-mono text-[10px] uppercase">{active}</span>
          </div>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-5">
          <label className="flex items-center gap-3 text-sm">
            <span className="text-base-content/50">Hue</span>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              aria-label="Hue"
              onChange={(event) => pickHue(Number(event.target.value))}
              className="range range-primary range-xs flex-1"
            />
            <span className="text-base-content font-mono text-xs">{hue}°</span>
          </label>
          <div className="flex flex-col gap-3">
            <CopyRow
              label="Active"
              value={active}
              swatch={active}
              copied={copied}
              onCopy={(text) => copy(text, text)}
            />
          </div>
          <TheoryNote title="Color Wheel">
            The wheel arranges hues by angle — 0° red, 120° green and 240° blue.
            Harmonies are hues related by fixed angles: complementary colors sit
            180° apart, analogous colors are within 30°, and triadic colors are
            spaced 120° around the wheel.
          </TheoryNote>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {harmonyRows(hue).map(({ label, hues }) => (
          <div key={label}>
            <h3 className="text-base-content/50 mb-2 text-xs font-medium uppercase">
              {label}
            </h3>
            <div className="flex gap-3">
              {hues.map((h) => {
                const hex = hslToHex({ h, s: 100, l: 50 });
                return (
                  <Swatch
                    key={hex}
                    hex={hex}
                    copied={copied === hex}
                    onCopy={(value) => copy(value, value)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
ColorWheel.displayName = 'ColorWheel';
