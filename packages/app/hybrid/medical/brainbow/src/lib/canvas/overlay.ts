import type {
  Annotation,
  AnnotationLayer,
  MeasureKind,
  Point,
} from '@/types/annotation';
import type { Calibration, ViewTransform } from '@/types/image';
import { imageToScreen, screenToImage } from '@/lib/geometry/transform';
import { drawScaleBar, type ScaleBarSpec } from '@/lib/canvas/scale';
import {
  formatMeasure,
  measureAngle,
  measureArea,
  measureDistance,
} from '@/lib/measure/measure';

export interface DraftPath {
  points: Point[];
  color: string;
}

export interface MeasureDraft {
  kind: MeasureKind;
  points: Point[];
  calibration: Calibration;
}

export interface GridGuides {
  visible: boolean;
  spacing: number;
}

const tracePoints = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
  transform: ViewTransform
): void => {
  const mapped = points.map((point) => imageToScreen(point, transform));
  if (mapped.length === 0) return;
  ctx.beginPath();
  mapped.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
};

const drawShape = (
  ctx: CanvasRenderingContext2D,
  annotation: Annotation,
  transform: ViewTransform
): void => {
  tracePoints(ctx, annotation.points, transform);
  if (annotation.kind === 'polygon' && annotation.points.length > 2) {
    ctx.closePath();
  }
  ctx.stroke();
};

const drawDraft = (
  ctx: CanvasRenderingContext2D,
  draft: DraftPath,
  transform: ViewTransform
): void => {
  ctx.strokeStyle = draft.color;
  ctx.setLineDash([4, 4]);
  tracePoints(ctx, draft.points, transform);
  ctx.stroke();
  ctx.setLineDash([]);

  for (const point of draft.points) {
    const mapped = imageToScreen(point, transform);
    ctx.beginPath();
    ctx.arc(mapped.x, mapped.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = draft.color;
    ctx.fill();
  }
};

const measureLabel = (draft: MeasureDraft): string | null => {
  const { kind, points, calibration } = draft;
  if (kind === 'distance') {
    return points.length >= 2
      ? formatMeasure(measureDistance(points, calibration))
      : null;
  }
  if (kind === 'angle') {
    return points.length >= 3 ? `${measureAngle(points).toFixed(1)}°` : null;
  }
  return points.length >= 3
    ? formatMeasure(measureArea(points, calibration), true)
    : null;
};

const measureAnchor = (draft: MeasureDraft): Point | null => {
  const { kind, points } = draft;
  if (points.length === 0) return null;
  if (kind === 'angle') return points[points.length - 2] ?? null;
  if (kind === 'distance') {
    const start = points[points.length - 2] ?? points[0];
    const end = points[points.length - 1];
    return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }
  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / points.length, y: sum.y / points.length };
};

const drawMeasure = (
  ctx: CanvasRenderingContext2D,
  draft: MeasureDraft,
  transform: ViewTransform,
  width: number,
  height: number
): void => {
  const { kind, points } = draft;
  if (points.length === 0) return;

  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([6, 4]);
  tracePoints(ctx, points, transform);
  if (kind === 'area' && points.length > 2) ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);

  for (const point of points) {
    const mapped = imageToScreen(point, transform);
    ctx.beginPath();
    ctx.arc(mapped.x, mapped.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  const label = measureLabel(draft);
  const anchor = measureAnchor(draft);
  if (label === null || anchor === null) return;
  const mapped = imageToScreen(anchor, transform);
  ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
  const padding = 4;
  const textWidth = ctx.measureText(label).width;
  const boxWidth = textWidth + padding * 2;
  const boxHeight = 18;
  const x = Math.max(0, Math.min(width - boxWidth, mapped.x - boxWidth / 2));
  const y = Math.max(boxHeight, mapped.y - 10);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.fillRect(x, y - boxHeight, boxWidth, boxHeight);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, x + padding, y - boxHeight / 2 + 6);
};

const drawGrid = (
  ctx: CanvasRenderingContext2D,
  transform: ViewTransform,
  width: number,
  height: number,
  spacing: number
): void => {
  if (spacing <= 0) return;
  let step = spacing;
  while (step * transform.scale < 4) step *= 2;

  const topLeft = screenToImage({ x: 0, y: 0 }, transform);
  const bottomRight = screenToImage({ x: width, y: height }, transform);
  const startX = Math.floor(topLeft.x / step) * step;
  const startY = Math.floor(topLeft.y / step) * step;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = startX; x <= bottomRight.x; x += step) {
    const screenX = imageToScreen({ x, y: 0 }, transform).x;
    ctx.moveTo(screenX, 0);
    ctx.lineTo(screenX, height);
  }
  for (let y = startY; y <= bottomRight.y; y += step) {
    const screenY = imageToScreen({ x: 0, y }, transform).y;
    ctx.moveTo(0, screenY);
    ctx.lineTo(width, screenY);
  }
  ctx.stroke();
};

export const drawAnnotationOverlay = (
  canvas: HTMLCanvasElement,
  layers: AnnotationLayer[],
  transform: ViewTransform,
  draft: DraftPath | null,
  dpr: number,
  scaleBar: ScaleBarSpec | null = null,
  measure: MeasureDraft | null = null,
  guides: GridGuides | null = null
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  if (guides?.visible) {
    drawGrid(
      ctx,
      transform,
      canvas.clientWidth,
      canvas.clientHeight,
      guides.spacing
    );
  }

  ctx.lineWidth = 1.5;
  for (const layer of layers) {
    if (!layer.visible) continue;
    ctx.strokeStyle = layer.color;
    for (const annotation of layer.annotations) {
      drawShape(ctx, annotation, transform);
    }
  }

  if (draft && draft.points.length > 0) {
    drawDraft(ctx, draft, transform);
  }

  if (measure) {
    drawMeasure(
      ctx,
      measure,
      transform,
      canvas.clientWidth,
      canvas.clientHeight
    );
  }

  if (scaleBar) {
    drawScaleBar(ctx, scaleBar, canvas.clientWidth, canvas.clientHeight);
  }
};
