'use client';

import {
  useEffect,
  useRef,
  type FC,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import type { ImageRaster, ViewTransform } from '@/types/image';
import type { ViewerSize } from '@/hooks/useImageViewer';
import { zoomAt } from '@/lib/geometry/viewport';

export interface ViewerCanvasProps {
  raster: ImageRaster | null;
  transform: ViewTransform;
  onTransformChange: (transform: ViewTransform) => void;
  onSizeChange: (size: ViewerSize) => void;
}

const drawRaster = (
  canvas: HTMLCanvasElement,
  raster: ImageRaster,
  transform: ViewTransform,
  dpr: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const offscreen = document.createElement('canvas');
  offscreen.width = raster.width;
  offscreen.height = raster.height;
  const offscreenCtx = offscreen.getContext('2d');
  if (!offscreenCtx) return;

  offscreenCtx.putImageData(
    new ImageData(
      new Uint8ClampedArray(raster.data),
      raster.width,
      raster.height
    ),
    0,
    0
  );

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    offscreen,
    transform.offsetX,
    transform.offsetY,
    raster.width * transform.scale,
    raster.height * transform.scale
  );
};

export const ViewerCanvas: FC<ViewerCanvasProps> = ({
  raster,
  transform,
  onTransformChange,
  onSizeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver(() => {
      onSizeChange({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [onSizeChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !raster) return;
    const dpr = window.devicePixelRatio || 1;
    drawRaster(canvas, raster, transform, dpr);
  }, [raster, transform]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const pointX = event.clientX - rect.left;
    const pointY = event.clientY - rect.top;
    const factor = event.deltaY < 0 ? 1.25 : 0.8;
    onTransformChange(zoomAt(transform, pointX, pointY, factor));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    draggingRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const start = draggingRef.current;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    draggingRef.current = { x: event.clientX, y: event.clientY };
    onTransformChange({
      ...transform,
      offsetX: transform.offsetX + deltaX,
      offsetY: transform.offsetY + deltaY,
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    draggingRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-testid="viewer-canvas">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
