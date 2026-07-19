'use client';

import { useEffect, useRef, type FC } from 'react';
import { applyWindowLevel, type WindowLevel } from '@/lib/viewer/lut';
import { applyCrosshair } from '@/lib/compare';

export interface SliceCanvasProps {
  data: ArrayBuffer | null;
  rows: number;
  columns: number;
  signedPixels: boolean;
  windowLevel: WindowLevel;
  crosshair?: { x: number; y: number } | null;
  label: string;
  testId: string;
}

/** Renders one 16-bit slice with optional crosshair overlay. */
export const SliceCanvas: FC<SliceCanvasProps> = ({
  data,
  rows,
  columns,
  signedPixels,
  windowLevel,
  crosshair = null,
  label,
  testId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || rows <= 0 || columns <= 0) return;
    canvas.width = columns;
    canvas.height = rows;
    const context = canvas.getContext('2d');
    if (!context) return;
    const rgba = applyWindowLevel(data, signedPixels, windowLevel);
    if (crosshair) {
      applyCrosshair(rgba, columns, rows, crosshair.x, crosshair.y);
    }
    context.putImageData(new ImageData(rgba, columns, rows), 0, 0);
  }, [columns, crosshair, data, rows, signedPixels, windowLevel]);

  return (
    <figure className="flex flex-col items-center gap-1">
      <div className="bg-black" data-testid={testId}>
        <canvas
          ref={canvasRef}
          className="max-h-[45vh] w-auto object-contain"
          aria-label={label}
        />
      </div>
      <figcaption className="text-base-content/60 text-xs">{label}</figcaption>
    </figure>
  );
};
