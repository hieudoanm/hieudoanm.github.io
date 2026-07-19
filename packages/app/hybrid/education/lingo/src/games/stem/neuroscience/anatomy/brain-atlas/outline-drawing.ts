import {
  DEEP,
  FILL,
  HEIGHT,
  LABEL,
  LOBES,
  SCALP,
  SPOT,
  SULCI,
  WIDTH,
  outlinePath,
  toX,
  toY,
} from './outline-geometry';
import type { Point } from './outline-geometry';
import type { BrainRegion } from './types';

const drawLobes = (ctx: CanvasRenderingContext2D): void => {
  LOBES.forEach((shape) => {
    outlinePath(ctx, shape);
    ctx.fillStyle = FILL;
    ctx.fill();
    ctx.strokeStyle = SCALP;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
};

const drawSulcalLines = (
  ctx: CanvasRenderingContext2D,
  lines: readonly (readonly Point[])[]
): void => {
  ctx.strokeStyle = DEEP;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  lines.forEach((line) => {
    ctx.beginPath();
    line.forEach(([x, y], i) =>
      i === 0 ? ctx.moveTo(toX(x), toY(y)) : ctx.lineTo(toX(x), toY(y))
    );
    ctx.stroke();
  });
  ctx.setLineDash([]);
};

const drawSpot = (
  ctx: CanvasRenderingContext2D,
  region: BrainRegion,
  alpha: number,
  radius: number,
  ring: boolean
): void => {
  if (!region.anchor) return;
  const { x, y } = region.anchor;
  ctx.beginPath();
  ctx.arc(toX(x), toY(y), radius, 0, Math.PI * 2);
  if (ring) {
    ctx.strokeStyle = `rgba(${SPOT},${alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(toX(x), toY(y), radius * 0.45, 0, Math.PI * 2);
  } else {
    ctx.fillStyle = `rgba(${SPOT},${alpha})`;
  }
  ctx.fill();
  ctx.fillStyle = LABEL;
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(region.name, toX(x), toY(y) - radius - 5);
};

export interface Scene {
  regions: BrainRegion[];
  buried: BrainRegion[];
  selectedId: string | null;
}

/** Renders the whole lateral view: lobes, sulci, then hotspots. */
export const renderScene = (ctx: CanvasRenderingContext2D, s: Scene): void => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawLobes(ctx);
  drawSulcalLines(ctx, SULCI);
  s.buried.forEach((region) => drawSpot(ctx, region, 0.3, 3, false));
  s.regions.forEach((region) => {
    const selected = region.id === s.selectedId;
    drawSpot(ctx, region, selected ? 1 : 0.75, selected ? 8 : 5, selected);
  });
};
