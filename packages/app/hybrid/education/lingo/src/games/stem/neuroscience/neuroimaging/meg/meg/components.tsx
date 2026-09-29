'use client';

import { FC, useEffect, useRef } from 'react';
import type { FieldSample, SensorPoint } from './types';

const WIDTH = 260;
const HEIGHT = 260;
const RADIUS = 105;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const project = (s: SensorPoint): { x: number; y: number } => {
  const az = (s.azimuth * Math.PI) / 180;
  const el = (s.elevation * Math.PI) / 180;
  // Orthographic projection of the upper hemisphere, nose pointing up.
  return {
    x: CX + RADIUS * Math.cos(el) * Math.sin(az),
    y: CY - RADIUS * Math.sin(el),
  };
};

/** Diverging blue-white-red map, zero mapped to white. */
const color = (v: number, peak: number): string => {
  if (peak === 0) return 'rgb(255,255,255)';
  const t = Math.max(-1, Math.min(v / peak, 1));
  const a = Math.abs(t);
  const base = t > 0 ? [220, 60, 60] : [40, 90, 220];
  return `rgb(${Math.round(255 - (255 - base[0]) * a)}, ${Math.round(
    255 - (255 - base[1]) * a
  )}, ${Math.round(255 - (255 - base[2]) * a)})`;
};

const drawHead = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'rgba(128,128,128,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  ctx.stroke();

  // Nose marker
  ctx.beginPath();
  ctx.moveTo(CX, CY - RADIUS - 10);
  ctx.lineTo(CX, CY - RADIUS + 2);
  ctx.stroke();

  // Crosshair
  ctx.strokeStyle = 'rgba(128,128,128,0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CX - RADIUS, CY);
  ctx.lineTo(CX + RADIUS, CY);
  ctx.moveTo(CX, CY - RADIUS);
  ctx.lineTo(CX, CY + RADIUS);
  ctx.stroke();
};

const drawMap = (
  ctx: CanvasRenderingContext2D,
  samples: FieldSample[],
  key: 'magnetic' | 'volumeConducted',
  peak: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY, RADIUS - 2, 0, Math.PI * 2);
  ctx.clip();
  for (const s of samples) {
    const { x, y } = project(s.sensor);
    ctx.fillStyle = color(s[key], peak);
    ctx.fillRect(x - 3, y - 3, 6, 6);
  }
  ctx.restore();

  // Source marker
  ctx.fillStyle = 'rgba(34,197,94,0.95)';
  ctx.beginPath();
  ctx.arc(CX, CY - RADIUS * 0.82, 4, 0, Math.PI * 2);
  ctx.fill();

  drawHead(ctx);
};

export const TopoMap: FC<{
  samples: FieldSample[];
  field: 'magnetic' | 'volumeConducted';
  peak: number;
  title: string;
}> = ({ samples, field, peak, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT + 16);
    drawMap(ctx, samples, field, peak);
    ctx.fillStyle = 'rgba(128,128,128,0.8)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title, CX, HEIGHT + 10);
  }, [samples, field, peak, title]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT + 16}
      className="border-base-content/10 bg-base-200/30 rounded-lg border"
    />
  );
};

/** Colour bar so the two maps can be compared on the same scale. */
export const ColorBar: FC<{ peak: number; label: string }> = ({
  peak,
  label,
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="h-24 w-4 rounded"
      style={{
        background: `linear-gradient(to top, rgb(40,90,220), rgb(255,255,255), rgb(220,60,60))`,
      }}
    />
    <span className="text-base-content/50 text-[10px]">
      ±{peak.toExponential(1)} {label}
    </span>
  </div>
);
