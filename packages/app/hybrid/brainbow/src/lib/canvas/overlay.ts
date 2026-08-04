import type { Annotation, AnnotationLayer, Point } from '@/types/annotation';
import type { ViewTransform } from '@/types/image';
import { imageToScreen } from '@/lib/geometry/transform';

export interface DraftPath {
  points: Point[];
  color: string;
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

export const drawAnnotationOverlay = (
  canvas: HTMLCanvasElement,
  layers: AnnotationLayer[],
  transform: ViewTransform,
  draft: DraftPath | null,
  dpr: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

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
};
