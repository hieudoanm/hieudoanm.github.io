'use client';

import { useEffect, useRef, useState, type FC } from 'react';
import { drawRasterToCanvas } from '@/lib/canvas/draw';
import { fitTransform } from '@/lib/geometry/viewport';
import type { ImageRaster } from '@/types/image';

export interface ComparePaneProps {
  raster: ImageRaster | null;
  name?: string | null;
}

export const ComparePane: FC<ComparePaneProps> = ({ raster, name }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => setFrame((value) => value + 1));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !raster) return;
    const dpr = window.devicePixelRatio || 1;
    const fit = fitTransform(
      raster.width,
      raster.height,
      canvas.clientWidth,
      canvas.clientHeight
    );
    drawRasterToCanvas(canvas, raster, fit, dpr);
  }, [raster, frame]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      data-testid="compare-pane">
      <canvas ref={canvasRef} className="h-full w-full" />
      {name ? (
        <span className="absolute top-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
          {name}
        </span>
      ) : null}
    </div>
  );
};
