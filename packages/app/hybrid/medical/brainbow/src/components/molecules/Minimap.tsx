'use client';

import { useEffect, useRef, useState, type FC, type PointerEvent } from 'react';
import { drawRasterToCanvas } from '@/lib/canvas/draw';
import { fitTransform } from '@/lib/geometry/viewport';
import {
  minimapRect,
  minimapToImage,
  visibleImageBounds,
} from '@/lib/geometry/minimap';
import type { ViewerSize } from '@/hooks/useImageViewer';
import type { ImageRaster, ViewTransform } from '@/types/image';

export interface MinimapProps {
  raster: ImageRaster | null;
  imageWidth: number;
  imageHeight: number;
  transform: ViewTransform;
  size: ViewerSize;
  onNavigate: (imageX: number, imageY: number) => void;
}

export const Minimap: FC<MinimapProps> = ({
  raster,
  imageWidth,
  imageHeight,
  transform,
  size,
  onNavigate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef(false);
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
    if (!canvas || !raster || imageWidth <= 0 || imageHeight <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    const fit = fitTransform(
      imageWidth,
      imageHeight,
      canvas.clientWidth,
      canvas.clientHeight
    );
    drawRasterToCanvas(canvas, raster, fit, dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bounds = visibleImageBounds(transform, size.width, size.height);
    const rect = minimapRect(bounds, fit);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }, [raster, imageWidth, imageHeight, transform, size, frame]);

  const navigateFromEvent = (event: PointerEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const fit = fitTransform(imageWidth, imageHeight, rect.width, rect.height);
    const image = minimapToImage(
      { x: event.clientX - rect.left, y: event.clientY - rect.top },
      fit
    );
    onNavigate(image.x, image.y);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    draggingRef.current = true;
    navigateFromEvent(event);
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (draggingRef.current) navigateFromEvent(event);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    draggingRef.current = false;
    if (typeof event.currentTarget.releasePointerCapture === 'function') {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="border-base-content/20 bg-base-200/80 absolute right-3 bottom-3 z-10 h-32 w-44 overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      data-testid="minimap"
      role="navigation"
      aria-label="Zoom minimap">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
