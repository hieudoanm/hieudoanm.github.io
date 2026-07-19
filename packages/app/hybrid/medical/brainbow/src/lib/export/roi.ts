import type { Annotation, AnnotationLayer, Point } from '@/types/annotation';
import { zipStore, type ZipEntry } from '@/lib/export/zip';

const TYPE_POLYGON = 0;
const TYPE_FREELINE = 5;
const SUBTYPE_FLOAT_COORDINATES = 0x10000;
const HEADER_SIZE = 74;

const magic = 0x746f7549;

const colorToArgb = (hex: string): number => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return 0xffffffff;
  const rgb = Number.parseInt(match[1], 16);
  return 0xff000000 | rgb;
};

const fitsShort = (value: number): boolean => value >= -32768 && value <= 32767;

export const roiBytes = (annotation: Annotation, color: string): Uint8Array => {
  const points = annotation.points;
  const xs = points.map((point) => Math.round(point.x));
  const ys = points.map((point) => Math.round(point.y));
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const useFloat =
    xs.some((value) => !fitsShort(value)) ||
    ys.some((value) => !fitsShort(value));
  const coordBytes = useFloat ? 4 : 2;
  const n = points.length;

  const buffer = new ArrayBuffer(HEADER_SIZE + 2 * n * coordBytes);
  const view = new DataView(buffer);
  view.setUint32(0, magic, true);
  view.setUint16(4, 1, true);
  view.setUint16(
    6,
    annotation.kind === 'polygon' ? TYPE_POLYGON : TYPE_FREELINE,
    true
  );
  view.setUint16(8, Math.max(0, minY), true);
  view.setUint16(10, Math.max(0, minX), true);
  view.setUint16(12, Math.max(0, maxY), true);
  view.setUint16(14, Math.max(0, maxX), true);
  view.setUint16(16, n, true);
  view.setFloat32(18, 1, true);
  view.setUint32(22, 0, true);
  view.setUint32(26, colorToArgb(color), true);
  view.setUint32(30, 0, true);
  view.setUint32(34, useFloat ? SUBTYPE_FLOAT_COORDINATES : 0, true);
  view.setUint16(38, 0, true);
  view.setUint16(40, 0, true);
  view.setUint16(42, 0, true);
  view.setUint16(44, 0, true);
  view.setUint32(46, 0, true);
  view.setUint16(70, HEADER_SIZE, true);
  view.setUint16(72, HEADER_SIZE + n * coordBytes, true);

  if (useFloat) {
    for (let i = 0; i < n; i += 1) {
      view.setFloat32(HEADER_SIZE + i * coordBytes, xs[i], true);
      view.setFloat32(HEADER_SIZE + (n + i) * coordBytes, ys[i], true);
    }
  } else {
    for (let i = 0; i < n; i += 1) {
      view.setInt16(HEADER_SIZE + i * coordBytes, xs[i], true);
      view.setInt16(HEADER_SIZE + (n + i) * coordBytes, ys[i], true);
    }
  }
  return new Uint8Array(buffer);
};

const sanitize = (name: string): string =>
  name.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'layer';

const annotationLabel = (layerName: string, index: number): string => {
  const label = `${sanitize(layerName)}-${String(index + 1).padStart(3, '0')}`;
  return `${label}.roi`;
};

const countPoints = (points: Point[]): number =>
  points.filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .length;

export const buildRoiSet = (
  layers: AnnotationLayer[]
): Uint8Array<ArrayBuffer> => {
  const entries: ZipEntry[] = [];
  for (const layer of layers) {
    if (!layer.visible) continue;
    let index = 0;
    for (const annotation of layer.annotations) {
      if (countPoints(annotation.points) < 2) continue;
      entries.push({
        name: annotationLabel(layer.name, index),
        data: roiBytes(annotation, layer.color),
      });
      index += 1;
    }
  }
  return zipStore(entries);
};
