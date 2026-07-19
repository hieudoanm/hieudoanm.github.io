'use client';

import type { FC } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CUISINES, type Cuisine } from '@/data';

export const SLICE_ANGLE = 360 / CUISINES.length;
export const FULL_TURNS = 5;
export const SETTLE_MS = 4000;

const COLORS = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#34d399',
  '#60a5fa',
  '#a78bfa',
  '#f472b6',
  '#22d3ee',
];

const WHEEL_SIZE = 320;
const LABEL_RADIUS = 88;

export interface WheelSpin {
  targetIndex: number;
  rotation: number;
}

export const buildWheelRotation = (
  targetIndex: number,
  current: number
): WheelSpin => {
  const landingMod =
    (CUISINES.length - targetIndex) * SLICE_ANGLE - SLICE_ANGLE / 2;
  const mod360 = ((landingMod % 360) + 360) % 360;
  const delta = (mod360 - (current % 360) + 360) % 360;
  return { targetIndex, rotation: current + FULL_TURNS * 360 + delta };
};

const buildConicGradient = (): string => {
  let acc = 0;
  const stops: string[] = [];
  CUISINES.forEach((_, index) => {
    const color = COLORS[index % COLORS.length];
    stops.push(`${color} ${acc}deg ${acc + SLICE_ANGLE}deg`);
    acc += SLICE_ANGLE;
  });
  return `conic-gradient(${stops.join(', ')})`;
};

interface CuisineWheelProps {
  settlingMs?: number;
}

export const CuisineWheel: FC<CuisineWheelProps> = ({
  settlingMs = SETTLE_MS,
}) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Cuisine | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gradient = useMemo(buildConicGradient, []);

  const spin = useCallback(() => {
    if (spinning) return;
    const targetIndex = Math.floor(Math.random() * CUISINES.length);
    const { rotation: next } = buildWheelRotation(targetIndex, rotation);
    setSpinning(true);
    setRotation(next);
    setResult(null);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setSpinning(false);
      setResult(CUISINES[targetIndex]);
    }, settlingMs);
  }, [rotation, spinning, settlingMs]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        className="relative"
        style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
        data-testid="cuisine-wheel-wrap">
        <div
          data-testid="wheel-pointer"
          aria-hidden
          className="text-primary absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow">
          ▼
        </div>
        <div
          data-testid="cuisine-wheel"
          className="ring-base-content/20 rounded-full shadow-2xl ring-4 shadow-black/40"
          style={{
            width: '100%',
            height: '100%',
            background: gradient,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${settlingMs}ms cubic-bezier(0.12, 0.8, 0.2, 1)`
              : 'none',
          }}>
          {CUISINES.map((cuisine, index) => {
            const sliceCenter = (index + 0.5) * SLICE_ANGLE;
            return (
              <span
                key={cuisine.value}
                data-testid={`wheel-sector-${cuisine.value}`}
                className="absolute top-1/2 left-1/2 flex flex-col items-center gap-0.5 leading-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${sliceCenter}deg) translateY(${-LABEL_RADIUS}px)`,
                }}>
                <span className="text-xl">{cuisine.emoji}</span>
                <span className="max-w-14 text-center text-[9px] font-bold whitespace-nowrap">
                  {cuisine.label}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        data-testid="wheel-spin"
        className="btn btn-primary btn-lg rounded-full px-10 text-base font-bold tracking-wide">
        {spinning ? 'Spinning…' : '🎡 Spin'}
      </button>

      <p
        data-testid="wheel-result"
        className="text-base-content/70 m-0 text-sm font-semibold tracking-wide">
        {result
          ? `${result.emoji} ${result.label}`
          : 'Press spin to pick a cuisine'}
      </p>

      {result && (
        <Link
          href={`/randomizer?country=${result.value}`}
          data-testid="wheel-result-link"
          className="btn btn-accent btn-sm rounded-full px-6">
          Spin a dish from {result.label} →
        </Link>
      )}
    </div>
  );
};

CuisineWheel.displayName = 'CuisineWheel';
