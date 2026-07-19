import type { ImageRaster } from '@/types/image';
import { hexToRgb } from '@/lib/image/channels';
import { boundingBox, pointInPolygon } from '@/lib/geometry/annotation';
import type { AnnotationLayer } from '@/types/annotation';

const FILL_ALPHA = 0.45;

const mix = (destination: number, source: number, alpha: number): number =>
  Math.round(destination * (1 - alpha) + source * alpha);

export const flattenAnnotations = (
  base: ImageRaster,
  layers: AnnotationLayer[]
): ImageRaster => {
  const { width, height } = base;
  const data = new Uint8ClampedArray(base.data);
  for (const layer of layers) {
    if (!layer.visible) {
      continue;
    }
    const fill = hexToRgb(layer.color);
    for (const annotation of layer.annotations) {
      if (annotation.points.length < 3) {
        continue;
      }
      const bounds = boundingBox(annotation.points);
      for (let y = Math.floor(bounds.minY); y <= bounds.maxY; y += 1) {
        for (let x = Math.floor(bounds.minX); x <= bounds.maxX; x += 1) {
          if (!pointInPolygon({ x, y }, annotation.points)) {
            continue;
          }
          const offset = (y * width + x) * 4;
          if (offset + 2 >= data.length) {
            continue;
          }
          data[offset] = mix(data[offset], fill.r, FILL_ALPHA);
          data[offset + 1] = mix(data[offset + 1], fill.g, FILL_ALPHA);
          data[offset + 2] = mix(data[offset + 2], fill.b, FILL_ALPHA);
        }
      }
    }
  }
  return { width, height, data };
};

export const rasterToBlob = (raster: ImageRaster): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  canvas.width = raster.width;
  canvas.height = raster.height;
  const context = canvas.getContext('2d');
  if (!context) {
    return Promise.reject(new Error('Canvas 2D context unavailable'));
  }
  context.putImageData(
    new ImageData(
      new Uint8ClampedArray(raster.data),
      raster.width,
      raster.height
    ),
    0,
    0
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('PNG export failed'));
      }
    }, 'image/png');
  });
};
