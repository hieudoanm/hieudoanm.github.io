'use client';

import { FC, useEffect, useRef } from 'react';
import type { SnrPoint } from './types';

const HELMET_GAP = 4;

export const SnrCanvas: FC<{
  curve: SnrPoint[];
  opmDistanceCm: number;
  width?: number;
  height?: number;
}> = ({ curve, opmDistanceCm, width = 560, height = 280 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const pad = { top: 20, bottom: 32, left: 46, right: 14 };
    const drawW = width - pad.left - pad.right;
    const drawH = height - pad.top - pad.bottom;

    const maxX = curve[curve.length - 1]?.distanceCm ?? 10;
    const maxY = Math.max(...curve.map((p) => p.snr));
    const yScale = Math.max(maxY, 1);

    const x = (v: number) => pad.left + (v / maxX) * drawW;
    const y = (v: number) => pad.top + drawH - (v / yScale) * drawH;

    // Axes
    ctx.strokeStyle = 'rgba(128,128,128,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + drawH);
    ctx.lineTo(pad.left + drawW, pad.top + drawH);
    ctx.stroke();

    ctx.fillStyle = 'rgba(128,128,128,0.75)';
    ctx.font = '9px monospace';
    for (let v = 0; v <= maxX; v += 2)
      ctx.fillText(`${v}`, x(v) - 5, height - 18);
    for (let i = 0; i <= 4; i++) {
      const v = (yScale / 4) * i;
      ctx.fillText(v.toFixed(v < 1 ? 2 : 0), 6, y(v) + 3);
    }
    ctx.fillText(
      'source-sensor distance (cm)',
      pad.left + drawW / 2 - 70,
      height - 4
    );
    ctx.fillText('SNR', 6, 12);

    // SNR curve — the cubic falloff is the whole point
    ctx.strokeStyle = 'rgba(59,130,246,0.95)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    curve.forEach((p, i) =>
      i === 0
        ? ctx.moveTo(x(p.distanceCm), y(p.snr))
        : ctx.lineTo(x(p.distanceCm), y(p.snr))
    );
    ctx.stroke();

    // Reference markers
    const mark = (dist: number, color: string, label: string) => {
      const p = curve.reduce((a, b) =>
        Math.abs(b.distanceCm - dist) < Math.abs(a.distanceCm - dist) ? b : a
      );
      const px = x(p.distanceCm);
      const py = y(p.snr);
      ctx.strokeStyle = color;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, pad.top + drawH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(label, px + 6, pad.top + 12);
    };

    mark(HELMET_GAP, 'rgba(148,163,184,0.95)', 'helmet 4 cm');
    if (opmDistanceCm > 0.3 && opmDistanceCm < maxX) {
      mark(opmDistanceCm, 'rgba(34,197,94,0.95)', 'OPM');
    }
  }, [curve, opmDistanceCm, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};

/** Signal + noise budget, drawn as nested bars. */
export const NoiseBudget: FC<{
  signalNT: number;
  ambientNT: number;
  sensorNoiseNT: number;
}> = ({ signalNT, ambientNT, sensorNoiseNT }) => {
  const total = Math.max(signalNT, ambientNT, sensorNoiseNT, 1e-6);
  const pct = (v: number) => `${Math.max((v / total) * 100, 1).toFixed(1)}%`;
  return (
    <div className="flex flex-col gap-2">
      {[
        { label: 'Cortical signal', value: signalNT, cls: 'bg-success' },
        { label: 'Ambient field', value: ambientNT, cls: 'bg-warning' },
        { label: 'Sensor noise', value: sensorNoiseNT, cls: 'bg-error' },
      ].map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="text-base-content/50 w-28 shrink-0 text-[10px]">
            {row.label}
          </span>
          <div className="bg-base-content/5 h-3 flex-1 overflow-hidden rounded">
            <div
              className={`h-full ${row.cls}`}
              style={{ width: pct(Math.abs(row.value)) }}
            />
          </div>
          <span className="text-base-content/60 w-20 shrink-0 text-right font-mono text-[10px]">
            {row.value.toExponential(1)} nT
          </span>
        </div>
      ))}
    </div>
  );
};
