import type { ImageRaster, ViewTransform } from '@/types/image';

export const drawRasterToCanvas = (
  canvas: HTMLCanvasElement,
  raster: ImageRaster,
  transform: ViewTransform,
  dpr: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const offscreen = document.createElement('canvas');
  offscreen.width = raster.width;
  offscreen.height = raster.height;
  const offscreenCtx = offscreen.getContext('2d');
  if (!offscreenCtx) return;

  offscreenCtx.putImageData(
    new ImageData(
      new Uint8ClampedArray(raster.data),
      raster.width,
      raster.height
    ),
    0,
    0
  );

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    offscreen,
    transform.offsetX,
    transform.offsetY,
    raster.width * transform.scale,
    raster.height * transform.scale
  );
};
