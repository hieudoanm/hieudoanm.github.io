'use client';

import { FC, useEffect, useMemo, useRef } from 'react';
import type { ErpParams } from './types';

const toY = (v: number, padTop: number, drawH: number, scale: number): number =>
  padTop + drawH / 2 - (v / scale) * (drawH / 2);

export const ErpCanvas: FC<{
  params: ErpParams;
  signal: number[];
  contaminated: number[];
  width?: number;
  height?: number;
  scale?: number;
}> = ({
  params,
  signal,
  contaminated,
  width = 520,
  height = 260,
  scale = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const markers = useMemo(
    () => params.components.map((c) => ({ name: c.name, at: c.latency })),
    [params.components]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const pad = { top: 20, bottom: 28, left: 34, right: 10 };
    const drawH = height - pad.top - pad.bottom;
    const drawW = width - pad.left - pad.right;
    const maxT = params.windowMs;

    // Time grid every 200 ms
    ctx.strokeStyle = 'rgba(128,128,128,0.15)';
    ctx.fillStyle = 'rgba(128,128,128,0.7)';
    ctx.font = '9px monospace';
    ctx.lineWidth = 1;
    for (let t = 0; t <= maxT; t += 200) {
      const x = pad.left + (t / maxT) * drawW;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + drawH);
      ctx.stroke();
      ctx.fillText(String(t), x - 8, height - 14);
    }

    // Baseline (0 uV) — the reference every component is defined against
    const y0 = toY(0, pad.top, drawH, scale);
    ctx.strokeStyle = 'rgba(128,128,128,0.5)';
    ctx.beginPath();
    ctx.moveTo(pad.left, y0);
    ctx.lineTo(pad.left + drawW, y0);
    ctx.stroke();
    ctx.fillText('0', 8, y0 + 3);
    ctx.fillText('+', 10, pad.top + 8);
    ctx.fillText('-', 12, pad.top + drawH - 2);
    ctx.fillText('uV', 6, pad.top - 8);

    const trace = (values: number[], color: string, lineWidth: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      values.forEach((v, i) => {
        const t = params.sampleRate ? (i * 1000) / params.sampleRate : 0;
        const x = pad.left + (t / maxT) * drawW;
        const y = Math.max(
          pad.top,
          Math.min(pad.top + drawH, toY(v, pad.top, drawH, scale))
        );
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    trace(contaminated, 'rgba(239,68,68,0.45)', 1);
    trace(signal, 'rgba(59,130,246,0.95)', 2);

    // Component latency markers
    ctx.font = '9px monospace';
    markers.forEach((m, i) => {
      const x = pad.left + (m.at / maxT) * drawW;
      ctx.strokeStyle = 'rgba(34,197,94,0.45)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + drawH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(34,197,94,0.9)';
      ctx.fillText(m.name, x + 2, pad.top + 10 + i * 9);
    });
  }, [params, signal, contaminated, width, height, scale, markers]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};
