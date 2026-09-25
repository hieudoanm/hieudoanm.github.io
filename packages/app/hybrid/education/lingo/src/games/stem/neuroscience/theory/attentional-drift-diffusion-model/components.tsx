'use client';

import { FC, useEffect, useRef } from 'react';
import type { ADDMTrial } from './types';

export const ADDMCanvas: FC<{ trial: ADDMTrial | null; boundary: number }> = ({
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

    // Map value [-boundary, boundary] to y pixels
    const toY = (v: number) => {
      const normalized = (v + boundary) / (2 * boundary); // 0 to 1 (where 0 is -b, 1 is +b)
      return pad.top + drawH - normalized * drawH;
    };

    // Draw Boundaries
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.setLineDash([4, 4]);

    // Upper (+b, Left choice)
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(boundary));
    ctx.lineTo(pad.left + drawW, toY(boundary));
    ctx.stroke();

    // Zero line
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(0));
    ctx.lineTo(pad.left + drawW, toY(0));
    ctx.stroke();

    // Lower (-b, Right choice)
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.moveTo(pad.left, toY(-boundary));
    ctx.lineTo(pad.left + drawW, toY(-boundary));
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px monospace';
    ctx.fillText('Left Choice (+b)', pad.left + 4, toY(boundary) - 4);
    ctx.fillText('Right Choice (-b)', pad.left + 4, toY(-boundary) + 12);

    if (!trial) return;

    ctx.setLineDash([]);
    const xStep = drawW / Math.max(trial.path.length - 1, 1);

    // Highlight fixation regions
    trial.fixations.forEach((fix) => {
      const xStart = pad.left + fix.startStep * xStep;
      const fixW = (fix.endStep - fix.startStep) * xStep;

      // Light green background if looking left, Light blue if looking right
      ctx.fillStyle =
        fix.target === 'left' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)';
      ctx.fillRect(xStart, pad.top, fixW, drawH);
    });

    // Draw path
    ctx.strokeStyle =
      trial.choice === 'left' ? 'rgba(34,197,94,0.9)' : 'rgba(59,130,246,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    trial.path.forEach((val, i) => {
      const x = pad.left + i * xStep;
      const y = toY(Math.max(-boundary, Math.min(val, boundary)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
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
