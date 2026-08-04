import { base64ToBytes } from '@/lib/io/base64';
import type { NativeImagePayload } from '@/lib/native';
import type { ImageRaster } from '@/types/image';

export class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageLoadError';
  }
}

export const SUPPORTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const drawBitmapToRaster = (
  bitmap: ImageBitmap,
  width: number,
  height: number
): ImageRaster => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new ImageLoadError('Canvas 2D context unavailable');

  context.drawImage(bitmap, 0, 0);
  const imageData = context.getImageData(0, 0, width, height);
  return { width, height, data: imageData.data };
};

const decodeBitmap = async (source: Blob): Promise<ImageBitmap> => {
  if (typeof window.createImageBitmap !== 'function') {
    throw new ImageLoadError('createImageBitmap is not supported');
  }
  return createImageBitmap(source);
};

const rasterFromBitmap = async (bitmap: ImageBitmap): Promise<ImageRaster> => {
  const { width, height } = { width: bitmap.width, height: bitmap.height };
  if (width <= 0 || height <= 0) {
    bitmap.close();
    throw new ImageLoadError('Image has invalid dimensions');
  }
  const raster = drawBitmapToRaster(bitmap, width, height);
  bitmap.close();
  return raster;
};

export const loadImageFile = async (file: File): Promise<ImageRaster> => {
  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new ImageLoadError(`Unsupported file type: ${file.type}`);
  }
  return rasterFromBitmap(await decodeBitmap(file));
};

const toBlobPart = (bytes: Uint8Array): ArrayBuffer =>
  bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;

export const loadImageFromBytes = async (
  bytes: Uint8Array
): Promise<ImageRaster> =>
  rasterFromBitmap(await decodeBitmap(new Blob([toBlobPart(bytes)])));

export const loadImageFiles = async (files: File[]): Promise<ImageRaster[]> => {
  const results = await Promise.allSettled(files.map(loadImageFile));
  return results.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
};

export const loadNativeImages = async (
  images: NativeImagePayload[]
): Promise<ImageRaster[]> => {
  const results = await Promise.allSettled(
    images.map(async (image) =>
      rasterFromBitmap(
        await decodeBitmap(new Blob([toBlobPart(base64ToBytes(image.data))]))
      )
    )
  );
  return results.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
};
