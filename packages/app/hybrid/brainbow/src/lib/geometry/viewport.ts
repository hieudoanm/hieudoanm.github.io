import type { ViewTransform } from '@/types/image';

export const DEFAULT_TRANSFORM: ViewTransform = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

export const fitTransform = (
  imageWidth: number,
  imageHeight: number,
  viewWidth: number,
  viewHeight: number
): ViewTransform => {
  if (viewWidth <= 0 || viewHeight <= 0) return DEFAULT_TRANSFORM;

  const scale = Math.min(viewWidth / imageWidth, viewHeight / imageHeight);
  return {
    scale,
    offsetX: (viewWidth - imageWidth * scale) / 2,
    offsetY: (viewHeight - imageHeight * scale) / 2,
  };
};

export const zoomAt = (
  transform: ViewTransform,
  pointX: number,
  pointY: number,
  factor: number
): ViewTransform => {
  const nextScale = Math.max(0.01, Math.min(64, transform.scale * factor));
  const ratio = nextScale / transform.scale;

  return {
    scale: nextScale,
    offsetX: pointX - (pointX - transform.offsetX) * ratio,
    offsetY: pointY - (pointY - transform.offsetY) * ratio,
  };
};

export const panBy = (
  transform: ViewTransform,
  deltaX: number,
  deltaY: number
): ViewTransform => ({
  ...transform,
  offsetX: transform.offsetX + deltaX,
  offsetY: transform.offsetY + deltaY,
});

export const imageToView = (
  transform: ViewTransform,
  imageX: number,
  imageY: number
): { x: number; y: number } => ({
  x: imageX * transform.scale + transform.offsetX,
  y: imageY * transform.scale + transform.offsetY,
});

export const viewToImage = (
  transform: ViewTransform,
  viewX: number,
  viewY: number
): { x: number; y: number } => ({
  x: (viewX - transform.offsetX) / transform.scale,
  y: (viewY - transform.offsetY) / transform.scale,
});
