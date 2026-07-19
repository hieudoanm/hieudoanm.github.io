import type { AnnotationLayer } from './annotation';
import type { Calibration, ChannelState } from './image';

export interface ProjectImage {
  id: string;
  name: string;
  width: number;
  height: number;
  data: string;
  calibration?: Calibration | null;
}

export interface Project {
  format: string;
  version: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  images: ProjectImage[];
  channels: ChannelState[];
  layers: AnnotationLayer[];
}
