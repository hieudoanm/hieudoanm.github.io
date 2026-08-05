import { toChannelRaster } from '@/lib/image/channels';
import type {
  Calibration,
  ChannelRaster,
  ImageRaster,
  StackRaster,
} from '@/types/image';
import type { Project } from '@/types/project';

export interface ViewerTransfer {
  raster: ChannelRaster;
  name: string;
  calibration: Calibration | null;
  stack?: StackRaster;
  project?: Project;
}

let pending: ViewerTransfer | null = null;

export const viewerStore = {
  set: (raster: ImageRaster, name: string): void => {
    pending = {
      raster: toChannelRaster(raster),
      name,
      calibration: null,
    };
  },
  setChannel: (
    raster: ChannelRaster,
    name: string,
    calibration: Calibration | null
  ): void => {
    pending = { raster, name, calibration };
  },
  setStack: (
    raster: ChannelRaster,
    stack: StackRaster,
    name: string,
    calibration: Calibration | null
  ): void => {
    pending = { raster, name, calibration, stack };
  },
  setProject: (project: Project): void => {
    const image = project.images[0];
    if (!image) return;
    pending = {
      raster: {
        width: image.width,
        height: image.height,
        planes: [],
      },
      name: project.name,
      calibration: image.calibration ?? null,
      project,
    };
  },
  take: (): ViewerTransfer | null => {
    const value = pending;
    pending = null;
    return value;
  },
};
