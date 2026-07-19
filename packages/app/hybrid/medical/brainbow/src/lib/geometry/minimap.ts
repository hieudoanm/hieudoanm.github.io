import type { Point } from '@/types/annotation';
import type { ViewTransform } from '@/types/image';
import { screenToImage, imageToScreen } from '@/lib/geometry/transform';

export interface ImageBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export const visibleImageBounds = (
  transform: ViewTransform,
  viewWidth: number,
  viewHeight: number
): ImageBounds => {
  const topLeft = screenToImage({ x: 0, y: 0 }, transform);
  const bottomRight = screenToImage({ x: viewWidth, y: viewHeight }, transform);
  return {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
  };
};

export const minimapRect = (
  bounds: ImageBounds,
  fit: ViewTransform
): { x: number; y: number; width: number; height: number } => {
  const topLeft = imageToScreen({ x: bounds.minX, y: bounds.minY }, fit);
  const bottomRight = imageToScreen({ x: bounds.maxX, y: bounds.maxY }, fit);
  return {
    x: topLeft.x,
    y: topLeft.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y,
  };
};

export const minimapToImage = (pixel: Point, fit: ViewTransform): Point =>
  screenToImage(pixel, fit);
