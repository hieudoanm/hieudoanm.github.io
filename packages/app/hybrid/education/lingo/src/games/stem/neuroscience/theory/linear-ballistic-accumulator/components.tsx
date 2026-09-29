'use client';

import { FC, useEffect, useRef } from 'react';
import type { LBATrial } from './types';

export const LBACanvas: FC<{
  trial: LBATrial | null;
  b: number;
  A: number;
}> = ({ trial, b, A }) => {
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
    const toY = (v: number) =>
      pad.top + drawH - (v / Math.max(b, A * 1.5)) * drawH;

    // Draw Threshold (b)
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(b));
    ctx.lineTo(pad.left + drawW, toY(b));
    ctx.stroke();

    // Draw Starting Range [0, A]
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(pad.left, toY(A), drawW, toY(0) - toY(A));

    if (!trial) return;

    ctx.setLineDash([]);
    const drawPath = (path: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const xStep = drawW / Math.max(path.length - 1, 1);
      path.forEach((val, i) => {
        const x = pad.left + i * xStep;
        const y = toY(val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawPath(trial.path1, 'rgba(34,197,94,0.9)'); // Green
    drawPath(trial.path2, 'rgba(59,130,246,0.9)'); // Blue
  }, [trial, b, A]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={240}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};
