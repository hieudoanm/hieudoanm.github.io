import type { Point } from '@/types/annotation';
import type { AnnotationLayer } from '@/types/annotation';
import type {
  ChannelRaster,
  ImageRaster,
  Orientation,
  Rotation,
} from '@/types/image';

export const DEFAULT_ORIENTATION: Orientation = {
  rotation: 0,
  flipX: false,
  flipY: false,
};

export const orientationEquals = (a: Orientation, b: Orientation): boolean =>
  a.rotation === b.rotation && a.flipX === b.flipX && a.flipY === b.flipY;

export const orientedSize = (
  orientation: Orientation,
  width: number,
  height: number
): { width: number; height: number } =>
  orientation.rotation === 90 || orientation.rotation === 270
    ? { width: height, height: width }
    : { width, height };

const rotateForward = (
  point: Point,
  rotation: Rotation,
  width: number,
  height: number
): Point => {
  switch (rotation) {
    case 90:
      return { x: height - 1 - point.y, y: point.x };
    case 180:
      return { x: width - 1 - point.x, y: height - 1 - point.y };
    case 270:
      return { x: point.y, y: width - 1 - point.x };
    default:
      return { x: point.x, y: point.y };
  }
};

export const orientPoint = (
  point: Point,
  orientation: Orientation,
  width: number,
  height: number
): Point => {
  const rotated = rotateForward(point, orientation.rotation, width, height);
  const { width: orientedWidth, height: orientedHeight } = orientedSize(
    orientation,
    width,
    height
  );
  return {
    x: orientation.flipX ? orientedWidth - 1 - rotated.x : rotated.x,
    y: orientation.flipY ? orientedHeight - 1 - rotated.y : rotated.y,
  };
};

const rotateInverse = (
  point: Point,
  rotation: Rotation,
  width: number,
  height: number
): Point => {
  switch (rotation) {
    case 90:
      return { x: point.y, y: width - 1 - point.x };
    case 180:
      return { x: width - 1 - point.x, y: height - 1 - point.y };
    case 270:
      return { x: height - 1 - point.y, y: point.x };
    default:
      return { x: point.x, y: point.y };
  }
};

export const invertPoint = (
  point: Point,
  orientation: Orientation,
  orientedWidth: number,
  orientedHeight: number
): Point => {
  const unflipped = {
    x: orientation.flipX ? orientedWidth - 1 - point.x : point.x,
    y: orientation.flipY ? orientedHeight - 1 - point.y : point.y,
  };
  return rotateInverse(
    unflipped,
    orientation.rotation,
    orientedWidth,
    orientedHeight
  );
};

export const remapPoints = (
  points: Point[],
  from: Orientation,
  to: Orientation,
  originalWidth: number,
  originalHeight: number
): Point[] => {
  if (orientationEquals(from, to)) return points;
  const { width: fromWidth, height: fromHeight } = orientedSize(
    from,
    originalWidth,
    originalHeight
  );
  return points.map((point) =>
    orientPoint(
      invertPoint(point, from, fromWidth, fromHeight),
      to,
      originalWidth,
      originalHeight
    )
  );
};

export const remapAnnotationLayers = (
  layers: AnnotationLayer[],
  from: Orientation,
  to: Orientation,
  originalWidth: number,
  originalHeight: number
): AnnotationLayer[] =>
  layers.map((layer) => ({
    ...layer,
    annotations: layer.annotations.map((annotation) => ({
      ...annotation,
      points: remapPoints(
        annotation.points,
        from,
        to,
        originalWidth,
        originalHeight
      ),
    })),
  }));

export const orientRaster = (
  raster: ImageRaster,
  orientation: Orientation
): ImageRaster => {
  if (orientationEquals(orientation, DEFAULT_ORIENTATION)) return raster;
  const { width, height, data } = raster;
  const { width: outWidth, height: outHeight } = orientedSize(
    orientation,
    width,
    height
  );
  const out = new Uint8ClampedArray(outWidth * outHeight * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dest = orientPoint({ x, y }, orientation, width, height);
      const sourceOffset = (y * width + x) * 4;
      const destOffset = (dest.y * outWidth + dest.x) * 4;
      for (let channel = 0; channel < 4; channel += 1) {
        out[destOffset + channel] = data[sourceOffset + channel];
      }
    }
  }
  return { width: outWidth, height: outHeight, data: out };
};

export const orientChannelRaster = (
  raster: ChannelRaster,
  orientation: Orientation
): ChannelRaster => {
  if (orientationEquals(orientation, DEFAULT_ORIENTATION)) return raster;
  const { width, height } = raster;
  const { width: outWidth, height: outHeight } = orientedSize(
    orientation,
    width,
    height
  );
  return {
    width: outWidth,
    height: outHeight,
    planes: raster.planes.map((plane) => {
      const data = new Uint8ClampedArray(outWidth * outHeight);
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const dest = orientPoint({ x, y }, orientation, width, height);
          data[dest.y * outWidth + dest.x] = plane.data[y * width + x];
        }
      }
      return { ...plane, data };
    }),
  };
};

export type OrientationAction = 'rotateCW' | 'rotateCCW' | 'flipX' | 'flipY';

export const nextOrientation = (
  orientation: Orientation,
  action: OrientationAction
): Orientation => {
  switch (action) {
    case 'rotateCW':
      return {
        ...orientation,
        rotation: ((orientation.rotation + 90) % 360) as Rotation,
      };
    case 'rotateCCW':
      return {
        ...orientation,
        rotation: ((orientation.rotation + 270) % 360) as Rotation,
      };
    case 'flipX':
      return { ...orientation, flipX: !orientation.flipX };
    case 'flipY':
      return { ...orientation, flipY: !orientation.flipY };
  }
};
