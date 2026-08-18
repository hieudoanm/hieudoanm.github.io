import type { AnnotationLayer, Point } from '@/types/annotation';

export const SNAP_THRESHOLD_PX = 8;
export const GRID_SPACING_DEFAULT = 50;

export const snapToGrid = (point: Point, spacing: number): Point => ({
  x: Math.round(point.x / spacing) * spacing,
  y: Math.round(point.y / spacing) * spacing,
});

export const findNearestVertex = (
  point: Point,
  vertices: Point[],
  threshold: number
): Point | null => {
  let best: Point | null = null;
  let bestDistance = threshold;
  for (const vertex of vertices) {
    const distance = Math.hypot(vertex.x - point.x, vertex.y - point.y);
    if (distance <= bestDistance) {
      bestDistance = distance;
      best = vertex;
    }
  }
  return best;
};

export const collectLayerVertices = (layers: AnnotationLayer[]): Point[] => {
  const vertices: Point[] = [];
  for (const layer of layers) {
    if (!layer.visible) continue;
    for (const annotation of layer.annotations) {
      vertices.push(...annotation.points);
    }
  }
  return vertices;
};

export const snapPoint = (
  point: Point,
  vertices: Point[],
  gridVisible: boolean,
  gridSpacing: number,
  threshold: number
): Point => {
  const vertex = findNearestVertex(point, vertices, threshold);
  if (vertex) return vertex;
  if (gridVisible && gridSpacing > 0) return snapToGrid(point, gridSpacing);
  return point;
};
