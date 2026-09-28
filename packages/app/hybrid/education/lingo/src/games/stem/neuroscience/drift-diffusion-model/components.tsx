'use client';

import { FC, useEffect, useMemo, useRef } from 'react';
import type { DDMTrial, SimulationResult } from './types';

// ─── Slider ──────────────────────────────────────────────────────────────────

export const Slider: FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step, format, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <label className="text-base-content/70 text-xs font-medium">
        {label}
      </label>
      <span className="text-primary font-mono text-xs font-bold">
        {format ? format(value) : value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-xs"
    />
    <div className="text-base-content/30 flex justify-between text-xs">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────

export const Stat: FC<{
  label: string;
  value: string;
  colorClass?: string;
}> = ({ label, value, colorClass = 'text-primary' }) => (
  <div className="border-base-content/10 bg-base-200/30 flex flex-col items-center gap-1 rounded-lg border px-4 py-3">
    <span className={`font-mono text-xl font-bold ${colorClass}`}>{value}</span>
    <span className="text-base-content/50 text-xs">{label}</span>
  </div>
);

// ─── Accumulator trace canvas ─────────────────────────────────────────────────

export const TraceCanvas: FC<{
  trial: DDMTrial | null;
  boundary: number;
  width?: number;
  height?: number;
}> = ({ trial, boundary, width = 480, height = 220 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const pad = { top: 24, bottom: 24, left: 12, right: 12 };
    const drawH = height - pad.top - pad.bottom;
    const drawW = width - pad.left - pad.right;
    const toY = (v: number) => pad.top + drawH - (v / boundary) * drawH;

    // Upper boundary (green)
    ctx.strokeStyle = 'rgba(34,197,94,0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(boundary));
    ctx.lineTo(pad.left + drawW, toY(boundary));
    ctx.stroke();

    // Lower boundary (red)
    ctx.strokeStyle = 'rgba(239,68,68,0.6)';
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(0));
    ctx.lineTo(pad.left + drawW, toY(0));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(34,197,94,0.8)';
    ctx.font = '10px monospace';
    ctx.fillText('Upper (correct)', pad.left + 4, toY(boundary) - 4);
    ctx.fillStyle = 'rgba(239,68,68,0.8)';
    ctx.fillText('Lower (error)', pad.left + 4, toY(0) + 12);

    if (!trial) return;

    const path = trial.path;
    const xStep = drawW / Math.max(path.length - 1, 1);
    ctx.strokeStyle =
      trial.boundary === 'upper'
        ? 'rgba(34,197,94,0.9)'
        : 'rgba(239,68,68,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    path.forEach((v, i) => {
      const x = pad.left + i * xStep;
      const y = toY(Math.min(Math.max(v, 0), boundary));
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [trial, boundary, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};

// ─── RT histogram ─────────────────────────────────────────────────────────────

export const Histogram: FC<{ result: SimulationResult | null }> = ({
  result,
}) => {
  const bars = useMemo(() => {
    if (!result) return [];
    const rts = result.trials.map((t) => t.rt);
    const min = Math.min(...rts);
    const max = Math.max(...rts);
    const binCount = 12;
    const binSize = Math.ceil((max - min) / binCount) || 50;
    const bins: { label: number; correct: number; error: number }[] =
      Array.from({ length: binCount }, (_, i) => ({
        label: min + i * binSize,
        correct: 0,
        error: 0,
      }));
    result.trials.forEach((t) => {
      const idx = Math.min(Math.floor((t.rt - min) / binSize), binCount - 1);
      if (t.correct) bins[idx].correct++;
      else bins[idx].error++;
    });
    const peak = Math.max(...bins.map((b) => b.correct + b.error), 1);
    return bins.map((b) => ({ ...b, peak }));
  }, [result]);

  if (!bars.length) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-base-content/60 text-xs">
        RT distribution (green = correct · red = error)
      </p>
      <div className="flex h-24 items-end gap-0.5">
        {bars.map((b, i) => (
          <div key={i} className="flex flex-1 flex-col-reverse">
            {b.error > 0 && (
              <div
                className="bg-error/60 w-full rounded-t"
                style={{ height: `${(b.error / b.peak) * 96}px` }}
              />
            )}
            {b.correct > 0 && (
              <div
                className="bg-success/60 w-full"
                style={{ height: `${(b.correct / b.peak) * 96}px` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-base-content/40 flex justify-between text-xs">
        <span>{bars[0]?.label} ms</span>
        <span>{bars[bars.length - 1]?.label} ms</span>
      </div>
    </div>
  );
};
