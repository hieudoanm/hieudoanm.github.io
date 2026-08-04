import type { AnnotationLayer } from './annotation';
import type { ChannelState } from './image';

export interface ProjectImage {
  id: string;
  name: string;
  width: number;
  height: number;
  data: string;
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
