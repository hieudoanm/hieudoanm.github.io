'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import { createId } from '@/lib/annotation/id';
import { drawRasterToCanvas, drawRasterToContext } from '@/lib/canvas/draw';
import { drawAnnotationOverlay } from '@/lib/canvas/overlay';
import { scaleBarSpec } from '@/lib/canvas/scale';
import {
  pathEncloses,
  polylineDistance,
  shouldClosePolygon,
  simplifyPath,
} from '@/lib/geometry/annotation';
import {
  collectLayerVertices,
  snapPoint,
  SNAP_THRESHOLD_PX,
} from '@/lib/geometry/snap';
import { screenToImage } from '@/lib/geometry/transform';
import { zoomAt } from '@/lib/geometry/viewport';
import type { ViewerSize } from '@/hooks/useImageViewer';
import type {
  Annotation,
  AnnotationLayer,
  MeasureKind,
  Point,
  ViewTool,
} from '@/types/annotation';
import type { Calibration, ImageRaster, ViewTransform } from '@/types/image';

export interface AnnotatorCanvasProps {
  raster: ImageRaster | null;
  transform: ViewTransform;
  layers: AnnotationLayer[];
  activeLayer: AnnotationLayer | null;
  tool: ViewTool;
  calibration: Calibration;
  densityOverlay?: ImageRaster | null;
  snapEnabled?: boolean;
  gridVisible?: boolean;
  gridSpacing?: number;
  compareRaster?: ImageRaster | null;
  compareDivider?: number | null;
  onTransformChange: (transform: ViewTransform) => void;
  onSizeChange: (size: ViewerSize) => void;
  onAddAnnotation: (annotation: Annotation) => void;
  onRemoveAnnotations: (ids: string[]) => void;
  onCompareDividerChange?: (position: number) => void;
}

const CLOSE_THRESHOLD = 8;
const DOUBLE_CLICK_MS = 350;
const ERASER_RADIUS_PX = 10;
const GRID_SPACING_DEFAULT = 50;
const DIVIDER_MIN = 0.08;
const DIVIDER_MAX = 0.92;

const capturePointer = (event: PointerEvent<HTMLDivElement>): void => {
  if (typeof event.currentTarget.setPointerCapture === 'function') {
    event.currentTarget.setPointerCapture(event.pointerId);
  }
};

const releasePointer = (event: PointerEvent<HTMLDivElement>): void => {
  if (typeof event.currentTarget.releasePointerCapture === 'function') {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
};

const MEASURE_TOOLS: Record<MeasureKind, ViewTool> = {
  distance: 'measureDistance',
  angle: 'measureAngle',
  area: 'measureArea',
};

const measureKindOf = (tool: ViewTool): MeasureKind | null => {
  const kind = (Object.keys(MEASURE_TOOLS) as MeasureKind[]).find(
    (entry) => MEASURE_TOOLS[entry] === tool
  );
  return kind ?? null;
};

const maxMeasurePoints = (kind: MeasureKind): number => {
  if (kind === 'distance') return 2;
  if (kind === 'angle') return 3;
  return Infinity;
};

export const AnnotatorCanvas: FC<AnnotatorCanvasProps> = ({
  raster,
  transform,
  layers,
  activeLayer,
  tool,
  calibration,
  densityOverlay,
  snapEnabled = false,
  gridVisible = false,
  gridSpacing = GRID_SPACING_DEFAULT,
  compareRaster,
  compareDivider,
  onTransformChange,
  onSizeChange,
  onAddAnnotation,
  onRemoveAnnotations,
  onCompareDividerChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rasterCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef<Point | null>(null);
  const lastClickRef = useRef(0);
  const draftRef = useRef<Point[]>([]);
  const [draft, setDraft] = useState<Point[]>([]);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dividerDraggingRef = useRef(false);
  const pinchRef = useRef<{
    transform: ViewTransform;
    distance: number;
    center: { x: number; y: number };
  } | null>(null);

  const vertices = useMemo(
    () => (snapEnabled ? collectLayerVertices(layers) : []),
    [layers, snapEnabled]
  );

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
    if (densityOverlay) {
      drawRasterToCanvas(canvas, densityOverlay, transform, dpr);
    }
    if (compareRaster && compareDivider != null) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dividerX = compareDivider * canvas.clientWidth;
      ctx.save();
      ctx.beginPath();
      ctx.rect(dividerX, 0, canvas.clientWidth - dividerX, canvas.clientHeight);
      ctx.clip();
      drawRasterToContext(
        ctx,
        compareRaster,
        transform,
        canvas.clientWidth,
        canvas.clientHeight
      );
      ctx.restore();
    }
  }, [raster, transform, densityOverlay, compareRaster, compareDivider]);

  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const draftPath =
      draft.length > 0
        ? { points: draft, color: activeLayer?.color ?? '#ffffff' }
        : null;
    const scaleBar = scaleBarSpec(
      transform.scale,
      calibration.pixelsPerMicron ?? 0
    );
    const measureKind = measureKindOf(tool);
    const measure =
      measureKind && draft.length > 0
        ? { kind: measureKind, points: draft, calibration }
        : null;
    drawAnnotationOverlay(
      canvas,
      layers,
      transform,
      draftPath,
      dpr,
      scaleBar,
      measure,
      { visible: gridVisible, spacing: gridSpacing }
    );
  }, [
    layers,
    transform,
    draft,
    activeLayer?.color,
    calibration,
    tool,
    gridVisible,
    gridSpacing,
  ]);

  useEffect(() => {
    draftRef.current = [];
    setDraft([]);
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

  const finishErase = useCallback(() => {
    const stroke = draftRef.current;
    draftRef.current = [];
    setDraft([]);
    if (stroke.length === 0 || !activeLayer) return;
    const radius = ERASER_RADIUS_PX / transform.scale;
    const removedIds = activeLayer.annotations
      .filter(
        (annotation) =>
          polylineDistance(
            annotation.points,
            stroke,
            annotation.kind === 'polygon',
            false
          ) <= radius
      )
      .map((annotation) => annotation.id);
    if (removedIds.length > 0) onRemoveAnnotations(removedIds);
  }, [activeLayer, transform.scale, onRemoveAnnotations]);

  const finishLasso = useCallback(() => {
    const polygon = draftRef.current;
    draftRef.current = [];
    setDraft([]);
    if (polygon.length < 3 || !activeLayer) return;
    const removedIds = activeLayer.annotations
      .filter((annotation) => pathEncloses(polygon, annotation.points))
      .map((annotation) => annotation.id);
    if (removedIds.length > 0) onRemoveAnnotations(removedIds);
  }, [activeLayer, onRemoveAnnotations]);

  const cancelDraft = useCallback(() => {
    draftRef.current = [];
    setDraft([]);
    draggingRef.current = null;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') cancelDraft();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cancelDraft]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const pointX = event.clientX - rect.left;
    const pointY = event.clientY - rect.top;
    const factor = event.deltaY < 0 ? 1.25 : 0.8;
    onTransformChange(zoomAt(transform, pointX, pointY, factor));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (pointersRef.current.size === 2) {
      const pointers = Array.from(pointersRef.current.values());
      const center = {
        x: (pointers[0].x + pointers[1].x) / 2 - rect.left,
        y: (pointers[0].y + pointers[1].y) / 2 - rect.top,
      };
      pinchRef.current = {
        transform,
        distance: Math.hypot(
          pointers[0].x - pointers[1].x,
          pointers[0].y - pointers[1].y
        ),
        center,
      };
      draggingRef.current = null;
      return;
    }

    if (tool === 'pan') {
      draggingRef.current = { x: event.clientX, y: event.clientY };
      capturePointer(event);
      return;
    }

    if (tool === 'erase') {
      draftRef.current = [imagePoint(event)];
      setDraft([imagePoint(event)]);
      capturePointer(event);
      return;
    }

    if (tool === 'polygon' || tool === 'lassoSubtract') {
      const now = Date.now();
      const doubleClick =
        now - lastClickRef.current < DOUBLE_CLICK_MS &&
        draftRef.current.length > 0;
      lastClickRef.current = now;
      if (doubleClick) {
        if (tool === 'polygon') finishPolygon();
        else finishLasso();
        return;
      }
      const point = snapPoint(
        imagePoint(event),
        vertices,
        gridVisible,
        gridSpacing,
        SNAP_THRESHOLD_PX / transform.scale
      );
      const next = [...draftRef.current, point];
      draftRef.current = next;
      setDraft(next);
      if (shouldClosePolygon(next, point, CLOSE_THRESHOLD / transform.scale)) {
        if (tool === 'polygon') finishPolygon();
        else finishLasso();
      }
      return;
    }

    if (tool === 'freehand') {
      draftRef.current = [imagePoint(event)];
      setDraft([imagePoint(event)]);
      capturePointer(event);
    }

    const measureKind = measureKindOf(tool);
    if (measureKind) {
      const point = imagePoint(event);
      if (draftRef.current.length >= maxMeasurePoints(measureKind)) {
        draftRef.current = [];
      }
      const next = [...draftRef.current, point];
      if (
        measureKind === 'area' &&
        shouldClosePolygon(next, point, CLOSE_THRESHOLD / transform.scale)
      ) {
        cancelDraft();
        return;
      }
      draftRef.current = next;
      setDraft(next);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
    }
    const pinch = pinchRef.current;
    if (pinch && pointersRef.current.size === 2) {
      const pointers = Array.from(pointersRef.current.values());
      const distance = Math.hypot(
        pointers[0].x - pointers[1].x,
        pointers[0].y - pointers[1].y
      );
      if (distance > 0) {
        onTransformChange(
          zoomAt(
            pinch.transform,
            pinch.center.x,
            pinch.center.y,
            distance / pinch.distance
          )
        );
      }
      return;
    }

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

    if (
      (tool === 'freehand' || tool === 'erase') &&
      draftRef.current.length > 0
    ) {
      const next = [...draftRef.current, imagePoint(event)];
      draftRef.current = next;
      setDraft(next);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
    }
    if (tool === 'pan') {
      draggingRef.current = null;
      releasePointer(event);
      return;
    }
    if (tool === 'freehand' && draftRef.current.length > 0) {
      finishFreehand();
    }
    if (tool === 'erase' && draftRef.current.length > 0) {
      finishErase();
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>): void => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
    }
    releasePointer(event);
    cancelDraft();
  };

  const handleDividerDown = (event: PointerEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    dividerDraggingRef.current = true;
    capturePointer(event);
  };

  const handleDividerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!dividerDraggingRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const position = (event.clientX - rect.left) / rect.width;
    onCompareDividerChange?.(
      Math.max(DIVIDER_MIN, Math.min(DIVIDER_MAX, position))
    );
  };

  const handleDividerUp = (event: PointerEvent<HTMLDivElement>): void => {
    dividerDraggingRef.current = false;
    releasePointer(event);
  };

  const cursorClass =
    tool === 'pan' ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair';

  const showDivider =
    Boolean(compareRaster) && compareDivider != null && onCompareDividerChange;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full touch-none overflow-hidden select-none ${cursorClass}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      data-testid="annotator-canvas">
      <canvas ref={rasterCanvasRef} className="h-full w-full" />
      <canvas
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {showDivider ? (
        <div
          role="separator"
          aria-label="Compare divider"
          aria-orientation="vertical"
          className="absolute top-0 bottom-0 z-10 w-1 cursor-ew-resize touch-none bg-white/70"
          style={{ left: `${(compareDivider ?? 0.5) * 100}%` }}
          data-testid="compare-divider"
          onPointerDown={handleDividerDown}
          onPointerMove={handleDividerMove}
          onPointerUp={handleDividerUp}
        />
      ) : null}
    </div>
  );
};
