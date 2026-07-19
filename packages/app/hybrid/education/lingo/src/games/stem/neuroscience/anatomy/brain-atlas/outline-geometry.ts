import type { BrainRegion } from './types';

export const WIDTH = 520;
export const HEIGHT = 380;
export const PAD = 14;
export const HIT_RADIUS = 26;
export const DRAW_W = WIDTH - PAD * 2;
export const DRAW_H = HEIGHT - PAD * 2;

/** Normalised outline coordinates map onto the padded drawing area. */
export const toX = (x: number): number => PAD + x * DRAW_W;
export const toY = (y: number): number => PAD + y * DRAW_H;

export type Point = readonly [number, number];

/** Schematic lateral silhouette: anterior to the left, dorsal at the top. */
export const CEREBRUM: readonly Point[] = [
  [0.1, 0.44],
  [0.15, 0.27],
  [0.29, 0.16],
  [0.47, 0.12],
  [0.65, 0.14],
  [0.8, 0.2],
  [0.89, 0.32],
  [0.9, 0.46],
  [0.84, 0.57],
  [0.7, 0.63],
  [0.52, 0.66],
  [0.34, 0.64],
  [0.19, 0.58],
  [0.11, 0.52],
];

export const CEREBELLUM: readonly Point[] = [
  [0.66, 0.63],
  [0.72, 0.59],
  [0.81, 0.61],
  [0.86, 0.67],
  [0.84, 0.75],
  [0.77, 0.79],
  [0.69, 0.76],
  [0.64, 0.7],
];

export const BRAINSTEM: readonly Point[] = [
  [0.5, 0.57],
  [0.58, 0.59],
  [0.58, 0.72],
  [0.55, 0.87],
  [0.5, 0.87],
  [0.49, 0.71],
];

/** Central sulcus, parieto-occipital sulcus, and the lateral sulcus. */
export const SULCI: readonly (readonly Point[])[] = [
  [
    [0.46, 0.13],
    [0.41, 0.27],
    [0.37, 0.41],
  ],
  [
    [0.76, 0.18],
    [0.7, 0.29],
    [0.65, 0.41],
  ],
  [
    [0.29, 0.47],
    [0.42, 0.53],
    [0.56, 0.54],
  ],
];

export const LOBES: readonly (readonly Point[])[] = [
  CEREBRUM,
  CEREBELLUM,
  BRAINSTEM,
];

export const SCALP = 'rgba(148,163,184,0.9)';
export const FILL = 'rgba(148,163,184,0.16)';
export const DEEP = 'rgba(148,163,184,0.5)';
export const SPOT = '34,197,94';
export const LABEL = 'rgba(15,23,42,0.9)';

/** Closes a polygon through midpoints, so a coarse outline reads as a curve. */
export const traceOutline = (
  ctx: CanvasRenderingContext2D,
  points: readonly Point[]
): void => {
  const last = points[points.length - 1];
  const first = points[0];
  ctx.moveTo(toX((last[0] + first[0]) / 2), toY((last[1] + first[1]) / 2));
  points.forEach((point, i) => {
    const next = points[(i + 1) % points.length];
    ctx.quadraticCurveTo(
      toX(point[0]),
      toY(point[1]),
      toX((point[0] + next[0]) / 2),
      toY((point[1] + next[1]) / 2)
    );
  });
  ctx.closePath();
};

export const outlinePath = (
  ctx: CanvasRenderingContext2D,
  points: readonly Point[]
): void => {
  ctx.beginPath();
  traceOutline(ctx, points);
};

/**
 * The anchored structure nearest a point given in canvas pixels, or null.
 * Callers must scale their click into canvas pixels first, so the radius stays
 * correct however the canvas is sized by CSS.
 */
export const nearestAnchor = (
  regions: readonly BrainRegion[],
  px: number,
  py: number
): BrainRegion | null => {
  let best: { region: BrainRegion; gap: number } | null = null;
  regions.forEach((region) => {
    if (!region.anchor) return;
    const gap = Math.hypot(
      toX(region.anchor.x) - px,
      toY(region.anchor.y) - py
    );
    if (best === null || gap < best.gap) best = { region, gap };
  });
  const hit = best as { region: BrainRegion; gap: number } | null;
  return hit !== null && hit.gap <= HIT_RADIUS ? hit.region : null;
};
