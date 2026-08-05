import { toChannelRaster } from '@/lib/image/channels';
import { isTiff, parseTiff, parseTiffStack } from '@/lib/image/tiff';
import type {
  Calibration,
  ChannelRaster,
  ImageRaster,
  StackRaster,
} from '@/types/image';

export class ImageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageLoadError';
  }
}

export const SUPPORTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/tiff',
  'image/tif',
];

export interface ChannelImageFile {
  raster: ChannelRaster;
  name: string;
  calibration: Calibration;
  stack?: StackRaster;
}

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

const readFileBytes = async (file: File): Promise<Uint8Array> =>
  new Uint8Array(await file.arrayBuffer());

const rasterFromTiff = (bytes: Uint8Array): ChannelImageFile => {
  const parsed = parseTiff(bytes);
  return {
    raster: {
      width: parsed.width,
      height: parsed.height,
      planes: parsed.planes,
    },
    name: '',
    calibration: parsed.calibration,
  };
};

const stackFromTiff = (bytes: Uint8Array): StackRaster | undefined => {
  const parsed = parseTiffStack(bytes);
  if (parsed.slices.length < 2) return undefined;
  return {
    width: parsed.width,
    height: parsed.height,
    slices: parsed.slices,
  };
};

export const loadChannelImageFile = async (
  file: File
): Promise<ChannelImageFile> => {
  const bytes = await readFileBytes(file);
  if (isTiff(bytes)) {
    const parsed = rasterFromTiff(bytes);
    return { ...parsed, stack: stackFromTiff(bytes), name: file.name };
  }
  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new ImageLoadError(`Unsupported file type: ${file.type}`);
  }
  const raster = await rasterFromBitmap(await decodeBitmap(file));
  return {
    raster: toChannelRaster(raster),
    name: file.name,
    calibration: { pixelsPerMicron: null },
  };
};

export const loadChannelRasterFromBytes = async (
  bytes: Uint8Array,
  name: string
): Promise<ChannelImageFile> => {
  if (isTiff(bytes)) {
    const parsed = rasterFromTiff(bytes);
    return { ...parsed, stack: stackFromTiff(bytes), name };
  }
  const raster = await rasterFromBitmap(
    await decodeBitmap(new Blob([toBlobPart(bytes)]))
  );
  return {
    raster: toChannelRaster(raster),
    name,
    calibration: { pixelsPerMicron: null },
  };
};

export const loadImageFiles = async (files: File[]): Promise<ImageRaster[]> => {
  const results = await Promise.allSettled(files.map(loadImageFile));
  return results.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : []
  );
};
