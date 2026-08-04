'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import { createId } from '@/lib/annotation/id';
import { drawRasterToCanvas } from '@/lib/canvas/draw';
import { drawAnnotationOverlay } from '@/lib/canvas/overlay';
import { shouldClosePolygon, simplifyPath } from '@/lib/geometry/annotation';
import { screenToImage } from '@/lib/geometry/transform';
import { zoomAt } from '@/lib/geometry/viewport';
import type { ViewerSize } from '@/hooks/useImageViewer';
import type {
  Annotation,
  AnnotationLayer,
  Point,
  ViewTool,
} from '@/types/annotation';
import type { ImageRaster, ViewTransform } from '@/types/image';

export interface AnnotatorCanvasProps {
  raster: ImageRaster | null;
  transform: ViewTransform;
  layers: AnnotationLayer[];
  activeLayer: AnnotationLayer | null;
  tool: ViewTool;
  onTransformChange: (transform: ViewTransform) => void;
  onSizeChange: (size: ViewerSize) => void;
  onAddAnnotation: (annotation: Annotation) => void;
}

const CLOSE_THRESHOLD = 8;
const DOUBLE_CLICK_MS = 350;

export const AnnotatorCanvas: FC<AnnotatorCanvasProps> = ({
  raster,
  transform,
  layers,
  activeLayer,
  tool,
  onTransformChange,
  onSizeChange,
  onAddAnnotation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rasterCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef<Point | null>(null);
  const lastClickRef = useRef(0);
  const draftRef = useRef<Point[]>([]);
  const [draft, setDraft] = useState<Point[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
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
    const canvas = rasterCanvasRef.current;
    if (!canvas || !raster) return;
    const dpr = window.devicePixelRatio || 1;
    drawRasterToCanvas(canvas, raster, transform, dpr);
  }, [raster, transform]);

  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const draftPath =
      draft.length > 0
        ? { points: draft, color: activeLayer?.color ?? '#ffffff' }
        : null;
    drawAnnotationOverlay(canvas, layers, transform, draftPath, dpr);
  }, [layers, transform, draft, activeLayer?.color]);

  useEffect(() => {
    if (tool === 'pan') {
      draftRef.current = [];
      setDraft([]);
    }
  }, [tool]);

  const imagePoint = (event: PointerEvent<HTMLDivElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return screenToImage(
      { x: event.clientX - rect.left, y: event.clientY - rect.top },
      transform
    );
  };

  const finishPolygon = useCallback(() => {
    const points = draftRef.current;
    if (points.length >= 3) {
      onAddAnnotation({ id: createId(), kind: 'polygon', points });
    }
    draftRef.current = [];
    setDraft([]);
  }, [onAddAnnotation]);

  const finishFreehand = useCallback(() => {
    const points = simplifyPath(draftRef.current, 1.5);
    if (points.length >= 2) {
      onAddAnnotation({ id: createId(), kind: 'freehand', points });
    }
    draftRef.current = [];
    setDraft([]);
  }, [onAddAnnotation]);

  const cancelDraft = useCallback(() => {
    draftRef.current = [];
    setDraft([]);
    draggingRef.current = null;
  }, []);

  const handleWheel = (event: WheelEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const pointX = event.clientX - rect.left;
    const pointY = event.clientY - rect.top;
    const factor = event.deltaY < 0 ? 1.25 : 0.8;
    onTransformChange(zoomAt(transform, pointX, pointY, factor));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (tool === 'pan') {
      draggingRef.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }

    if (tool === 'polygon') {
      const now = Date.now();
      const doubleClick =
        now - lastClickRef.current < DOUBLE_CLICK_MS &&
        draftRef.current.length > 0;
      lastClickRef.current = now;
      if (doubleClick) {
        finishPolygon();
        return;
      }
      const next = [...draftRef.current, imagePoint(event)];
      draftRef.current = next;
      setDraft(next);
      if (
        shouldClosePolygon(
          next,
          imagePoint(event),
          CLOSE_THRESHOLD / transform.scale
        )
      ) {
        finishPolygon();
      }
      return;
    }

    if (tool === 'freehand') {
      draftRef.current = [imagePoint(event)];
      setDraft([imagePoint(event)]);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (tool === 'pan') {
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
      return;
    }

    if (tool === 'freehand' && draftRef.current.length > 0) {
      const next = [...draftRef.current, imagePoint(event)];
      draftRef.current = next;
      setDraft(next);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    if (tool === 'pan') {
      draggingRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
      return;
    }
    if (tool === 'freehand' && draftRef.current.length > 0) {
      finishFreehand();
    }
  };

  const cursorClass =
    tool === 'pan' ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair';

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full touch-none overflow-hidden select-none ${cursorClass}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={cancelDraft}
      data-testid="annotator-canvas">
      <canvas ref={rasterCanvasRef} className="h-full w-full" />
      <canvas
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
};
