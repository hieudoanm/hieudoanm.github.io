'use client';

import { FC, useEffect, useRef } from 'react';
import type { HDDMSimulationResult } from './types';

export const HDDMScatterPlot: FC<{ result: HDDMSimulationResult | null }> = ({
  result,
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

    if (!result || result.subjects.length === 0) return;

    const pad = { top: 20, bottom: 40, left: 50, right: 20 };
    const drawH = height - pad.top - pad.bottom;
    const drawW = width - pad.left - pad.right;

    // Draw Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Y-axis (Accuracy)
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + drawH);
    // X-axis (RT)
    ctx.lineTo(pad.left + drawW, pad.top + drawH);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Mean Reaction Time (ms)', pad.left + drawW / 2, height - 10);

    ctx.save();
    ctx.translate(15, pad.top + drawH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Accuracy (%)', 0, 0);
    ctx.restore();

    // Map data to canvas
    const rts = result.subjects.map((s) => s.meanRT);
    const minRT = Math.max(0, Math.min(...rts) - 100);
    const maxRT = Math.max(...rts) + 100;

    const toX = (rt: number) =>
      pad.left + ((rt - minRT) / (maxRT - minRT)) * drawW;
    const toY = (acc: number) => pad.top + drawH - acc * drawH; // acc is 0 to 1

    // Plot subject points
    result.subjects.forEach((subj) => {
      const cx = toX(subj.meanRT);
      const cy = toY(subj.accuracy);

      // Draw individual subjects (dots)
      ctx.fillStyle = 'rgba(167,139,250,0.8)'; // Purple-ish
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Plot Population Mean (Large cross or star)
    const popX = toX(result.popMeanRT);
    const popY = toY(result.popAccuracy);

    ctx.strokeStyle = 'rgba(34,197,94,1)'; // Green
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(popX - 8, popY);
    ctx.lineTo(popX + 8, popY);
    ctx.moveTo(popX, popY - 8);
    ctx.lineTo(popX, popY + 8);
    ctx.stroke();

    // Labels for boundaries
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.textAlign = 'left';
    ctx.fillText(`${Math.round(minRT)}`, pad.left, pad.top + drawH + 15);
    ctx.textAlign = 'right';
    ctx.fillText(
      `${Math.round(maxRT)}`,
      pad.left + drawW,
      pad.top + drawH + 15
    );

    ctx.textAlign = 'right';
    ctx.fillText('100%', pad.left - 5, pad.top + 5);
    ctx.fillText('0%', pad.left - 5, pad.top + drawH);
  }, [result]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={320}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};
