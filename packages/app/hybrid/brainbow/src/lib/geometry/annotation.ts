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

export const pointToSegmentDistance = (
  point: Point,
  start: Point,
  end: Point
): number => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0)
    return Math.hypot(point.x - start.x, point.y - start.y);
  const t = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared
    )
  );
  return Math.hypot(point.x - (start.x + t * dx), point.y - (start.y + t * dy));
};

const orientation = (a: Point, b: Point, c: Point): number =>
  (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

const onSegment = (a: Point, b: Point, c: Point): boolean =>
  Math.min(a.x, c.x) <= b.x &&
  b.x <= Math.max(a.x, c.x) &&
  Math.min(a.y, c.y) <= b.y &&
  b.y <= Math.max(a.y, c.y);

export const segmentsIntersect = (
  a: Point,
  b: Point,
  c: Point,
  d: Point
): boolean => {
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);
  if (o1 === 0 && onSegment(a, c, b)) return true;
  if (o2 === 0 && onSegment(a, d, b)) return true;
  if (o3 === 0 && onSegment(c, a, d)) return true;
  if (o4 === 0 && onSegment(c, b, d)) return true;
  return o1 * o2 < 0 && o3 * o4 < 0;
};

export const segmentDistance = (
  a: Point,
  b: Point,
  c: Point,
  d: Point
): number => {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    pointToSegmentDistance(a, c, d),
    pointToSegmentDistance(b, c, d),
    pointToSegmentDistance(c, a, b),
    pointToSegmentDistance(d, a, b)
  );
};

const segmentsOf = (points: Point[], closed: boolean): Point[][] => {
  const segments: Point[][] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    segments.push([points[i], points[i + 1]]);
  }
  if (closed && points.length > 2) {
    segments.push([points[points.length - 1], points[0]]);
  }
  return segments;
};

const pointToPolylineDistance = (
  point: Point,
  polyline: Point[],
  closed: boolean
): number => {
  if (polyline.length === 0) return Infinity;
  let minimum = Infinity;
  for (let i = 0; i < polyline.length - 1; i += 1) {
    minimum = Math.min(
      minimum,
      pointToSegmentDistance(point, polyline[i], polyline[i + 1])
    );
  }
  if (closed && polyline.length > 2) {
    minimum = Math.min(
      minimum,
      pointToSegmentDistance(point, polyline[polyline.length - 1], polyline[0])
    );
  }
  return minimum;
};

export const polylineDistance = (
  pointsA: Point[],
  pointsB: Point[],
  closedA = false,
  closedB = false
): number => {
  const segmentsA = segmentsOf(pointsA, closedA);
  const segmentsB = segmentsOf(pointsB, closedB);
  if (segmentsA.length === 0 && segmentsB.length === 0) {
    return pointsA.length > 0 && pointsB.length > 0
      ? Math.hypot(pointsA[0].x - pointsB[0].x, pointsA[0].y - pointsB[0].y)
      : Infinity;
  }
  if (segmentsA.length === 0) {
    return Math.min(
      ...pointsA.map((point) =>
        pointToPolylineDistance(point, pointsB, closedB)
      )
    );
  }
  if (segmentsB.length === 0) {
    return Math.min(
      ...pointsB.map((point) =>
        pointToPolylineDistance(point, pointsA, closedA)
      )
    );
  }
  let minimum = Infinity;
  for (const [a, b] of segmentsA) {
    for (const [c, d] of segmentsB) {
      minimum = Math.min(minimum, segmentDistance(a, b, c, d));
    }
  }
  return minimum;
};

export const pathEncloses = (polygon: Point[], points: Point[]): boolean =>
  points.length > 0 && points.every((point) => pointInPolygon(point, polygon));

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
