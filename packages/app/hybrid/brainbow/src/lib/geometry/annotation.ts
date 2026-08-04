import type { Point } from '@/types/annotation';

export const polygonArea = (points: Point[]): number => {
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return Math.abs(area) / 2;
};

export const pointInPolygon = (point: Point, polygon: Point[]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const a = polygon[i];
    const b = polygon[j];
    const intersects =
      a.y > point.y !== b.y > point.y &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
    if (intersects) inside = !inside;
  }
  return inside;
};

export const boundingBox = (
  points: Point[]
): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const point of points) {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }
  return { minX, minY, maxX, maxY };
};

export const shouldClosePolygon = (
  draft: Point[],
  cursor: Point,
  threshold: number
): boolean =>
  draft.length >= 3 &&
  Math.hypot(cursor.x - draft[0].x, cursor.y - draft[0].y) <= threshold;

export const pathLength = (points: Point[]): number => {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y
    );
  }
  return total;
};

const perpendicularDistance = (
  point: Point,
  start: Point,
  end: Point
): number => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const numerator = Math.abs(
    dy * point.x - dx * point.y + end.x * start.y - end.y * start.x
  );
  const length = Math.hypot(dx, dy);
  return length === 0
    ? Math.hypot(point.x - start.x, point.y - start.y)
    : numerator / length;
};

export const simplifyPath = (points: Point[], tolerance: number): Point[] => {
  if (points.length <= 2) return points;

  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = perpendicularDistance(
      points[i],
      points[0],
      points[points.length - 1]
    );
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }

  if (maxDistance <= tolerance) {
    return [points[0], points[points.length - 1]];
  }

  const left = simplifyPath(points.slice(0, index + 1), tolerance);
  const right = simplifyPath(points.slice(index), tolerance);
  return [...left.slice(0, -1), ...right];
};
