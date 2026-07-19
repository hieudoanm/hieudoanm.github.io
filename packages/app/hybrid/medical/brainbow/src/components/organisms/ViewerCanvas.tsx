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
import { drawRasterToCanvas } from '@/lib/canvas/draw';

export interface ViewerCanvasProps {
  raster: ImageRaster | null;
  transform: ViewTransform;
  onTransformChange: (transform: ViewTransform) => void;
  onSizeChange: (size: ViewerSize) => void;
}

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
    drawRasterToCanvas(canvas, raster, transform, dpr);
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
