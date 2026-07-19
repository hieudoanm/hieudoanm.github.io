'use client';

import { FC, useEffect, useRef } from 'react';
import type { RaceTrial } from './types';

export const RaceCanvas: FC<{ trial: RaceTrial | null; boundary: number }> = ({
  trial,
  boundary,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const pad = { top: 20, bottom: 20, left: 10, right: 10 };
    const drawH = height - pad.top - pad.bottom;
    const drawW = width - pad.left - pad.right;
    const toY = (v: number) => pad.top + drawH - (v / boundary) * drawH;

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(boundary));
    ctx.lineTo(pad.left + drawW, toY(boundary));
    ctx.stroke();

    if (!trial) return;

    ctx.setLineDash([]);
    const drawPath = (path: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const xStep = drawW / Math.max(path.length - 1, 1);
      path.forEach((val, i) => {
        const x = pad.left + i * xStep;
        const y = toY(Math.min(val, boundary)); // Cap display at boundary
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawPath(trial.path1, 'rgba(34,197,94,0.9)'); // Green
    drawPath(trial.path2, 'rgba(59,130,246,0.9)'); // Blue
  }, [trial, boundary]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={240}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};
