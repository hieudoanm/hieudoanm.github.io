import type { Point } from '@/types/annotation';
import type { ViewTransform } from '@/types/image';

export const screenToImage = (
  screen: Point,
  transform: ViewTransform
): Point => ({
  x: (screen.x - transform.offsetX) / transform.scale,
  y: (screen.y - transform.offsetY) / transform.scale,
});

export const imageToScreen = (
  image: Point,
  transform: ViewTransform
): Point => ({
  x: image.x * transform.scale + transform.offsetX,
  y: image.y * transform.scale + transform.offsetY,
});
