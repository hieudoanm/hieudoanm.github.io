import { polygonArea } from '@/lib/geometry/annotation';
import type { Point } from '@/types/annotation';
import type { Calibration } from '@/types/image';

export interface MeasureValue {
  pixels: number;
  microns: number | null;
}

const toMicrons = (
  pixels: number,
  calibration: Calibration,
  square = false
): number | null => {
  const pixelsPerMicron = calibration.pixelsPerMicron;
  if (pixelsPerMicron === null || pixelsPerMicron <= 0) return null;
  return square
    ? pixels / (pixelsPerMicron * pixelsPerMicron)
    : pixels / pixelsPerMicron;
};

export const measureDistance = (
  points: Point[],
  calibration: Calibration
): MeasureValue => {
  if (points.length < 2) return { pixels: 0, microns: null };
  const start = points[points.length - 2];
  const end = points[points.length - 1];
  const pixels = Math.hypot(end.x - start.x, end.y - start.y);
  return { pixels, microns: toMicrons(pixels, calibration) };
};

export const measureArea = (
  points: Point[],
  calibration: Calibration
): MeasureValue => {
  const pixels = polygonArea(points);
  return { pixels, microns: toMicrons(pixels, calibration, true) };
};

export const measureAngle = (points: Point[]): number => {
  if (points.length < 3) return 0;
  const start = points[points.length - 3];
  const vertex = points[points.length - 2];
  const end = points[points.length - 1];
  const first = { x: start.x - vertex.x, y: start.y - vertex.y };
  const second = { x: end.x - vertex.x, y: end.y - vertex.y };
  const magnitude =
    Math.hypot(first.x, first.y) * Math.hypot(second.x, second.y);
  if (magnitude === 0) return 0;
  const dot = first.x * second.x + first.y * second.y;
  const cosine = Math.max(-1, Math.min(1, dot / magnitude));
  return (Math.acos(cosine) * 180) / Math.PI;
};

export const formatMeasure = (value: MeasureValue, squared = false): string => {
  const pixels = `${value.pixels.toFixed(1)}${squared ? ' px²' : ' px'}`;
  if (value.microns === null) return pixels;
  return `${pixels} · ${value.microns.toFixed(2)}${squared ? ' µm²' : ' µm'}`;
};
