'use client';

import { FC, useEffect, useRef } from 'react';
import type { BoldSample } from './types';

const TR_MARKER = '#f59e0b';

export const BoldCanvas: FC<{
  samples: BoldSample[];
  windowS: number;
  width?: number;
  height?: number;
}> = ({ samples, windowS, width = 560, height = 280 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const pad = { top: 18, bottom: 30, left: 40, right: 12 };
    const drawW = width - pad.left - pad.right;
    const drawH = height - pad.top - pad.bottom;

    const values = samples.flatMap((s) => [s.neural, s.bold, s.sampled]);
    const maxV = Math.max(...values.map(Math.abs), 0.5);
    const x = (t: number) => pad.left + (t / windowS) * drawW;
    const y = (v: number) => pad.top + drawH / 2 - (v / maxV) * (drawH / 2);

    // Time grid
    ctx.strokeStyle = 'rgba(128,128,128,0.15)';
    ctx.fillStyle = 'rgba(128,128,128,0.7)';
    ctx.font = '9px monospace';
    ctx.lineWidth = 1;
    for (let t = 0; t <= windowS; t += 5) {
      ctx.beginPath();
      ctx.moveTo(x(t), pad.top);
      ctx.lineTo(x(t), pad.top + drawH);
      ctx.stroke();
      ctx.fillText(`${t}s`, x(t) - 8, height - 16);
    }

    ctx.strokeStyle = 'rgba(128,128,128,0.4)';
    ctx.beginPath();
    ctx.moveTo(pad.left, y(0));
    ctx.lineTo(pad.left + drawW, y(0));
    ctx.stroke();

    const trace = (
      key: 'neural' | 'bold' | 'sampled',
      color: string,
      lineWidth: number,
      dash: number[] = []
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(dash);
      ctx.beginPath();
      samples.forEach((s, i) => {
        i === 0
          ? ctx.moveTo(x(s.timeS), y(s[key]))
          : ctx.lineTo(x(s.timeS), y(s[key]));
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };

    trace('sampled', 'rgba(239,68,68,0.5)', 1, [3, 2]);
    trace('bold', 'rgba(59,130,246,0.95)', 2);
    trace('neural', 'rgba(34,197,94,0.9)', 1.5);

    // TR markers show how coarsely the scanner can sample the curve
    ctx.strokeStyle = 'rgba(245,158,11,0.35)';
    ctx.lineWidth = 1;
    for (const s of samples) {
      ctx.beginPath();
      ctx.moveTo(x(s.timeS), pad.top);
      ctx.lineTo(x(s.timeS), pad.top + drawH);
      ctx.stroke();
    }
    ctx.fillStyle = TR_MARKER;
    ctx.fillText('TR', pad.left + 2, pad.top - 6);
  }, [samples, windowS, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};

/** BOLD vs neural lag, drawn as two independent clocks. */
export const LagDiagram: FC<{ lagS: number }> = ({ lagS }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-1">
      <span className="text-success text-[10px] font-semibold">
        Neural drive
      </span>
      <div className="bg-success/15 border-success/40 flex items-center rounded border px-2 py-1">
        <span className="text-success font-mono text-[10px]">
          spike at t = 0
        </span>
      </div>
    </div>
    <div className="text-base-content/30 pl-2">
      ↓ {lagS.toFixed(1)} s vascular delay
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-info text-[10px] font-semibold">BOLD signal</span>
      <div
        className="bg-info/15 border-info/40 flex items-center rounded border px-2 py-1"
        style={{ marginLeft: `${Math.min(lagS * 14, 60)}%` }}>
        <span className="text-info font-mono text-[10px]">
          peak at {lagS.toFixed(1)} s
        </span>
      </div>
    </div>
  </div>
);
