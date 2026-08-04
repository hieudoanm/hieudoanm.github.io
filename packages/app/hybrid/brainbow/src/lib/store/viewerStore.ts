import type { ImageRaster } from '@/types/image';

export interface ViewerTransfer {
  raster: ImageRaster;
  name: string;
}

let pending: ViewerTransfer | null = null;

export const viewerStore = {
  set: (raster: ImageRaster, name: string): void => {
    pending = { raster, name };
  },
  take: (): ViewerTransfer | null => {
    const value = pending;
    pending = null;
    return value;
  },
};
