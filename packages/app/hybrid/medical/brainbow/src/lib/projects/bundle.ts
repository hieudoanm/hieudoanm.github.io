import { z } from 'zod';
import type { Calibration, ImageRaster } from '@/types/image';
import type { Project, ProjectImage } from '@/types/project';

export const PROJECT_FORMAT = 'brainbow-project';
export const PROJECT_VERSION = 1;
export const PROJECT_EXTENSION = 'brainbow';

const pointSchema = z.object({ x: z.number(), y: z.number() });

const annotationSchema = z.object({
  id: z.string(),
  kind: z.enum(['polygon', 'freehand']),
  points: z.array(pointSchema),
});

const layerSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  visible: z.boolean(),
  annotations: z.array(annotationSchema),
});

const channelSchema = z.object({
  id: z.string(),
  name: z.string(),
  sourcePlane: z.string(),
  color: z.string(),
  visible: z.boolean(),
  opacity: z.number(),
});

const calibrationSchema = z
  .object({ pixelsPerMicron: z.number().nullable() })
  .nullish();

const projectImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  data: z.string(),
  calibration: calibrationSchema,
});

export const projectSchema = z.object({
  format: z.literal(PROJECT_FORMAT),
  version: z.literal(PROJECT_VERSION),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  images: z.array(projectImageSchema),
  channels: z.array(channelSchema),
  layers: z.array(layerSchema),
});

const CHUNK_SIZE = 0x8000;

export const bytesToBase64 = (bytes: Uint8ClampedArray): string => {
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK_SIZE));
  }
  return btoa(binary);
};

export const base64ToBytes = (base64: string): Uint8ClampedArray => {
  const binary = atob(base64);
  const bytes = new Uint8ClampedArray(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const imageToProjectImage = (
  raster: ImageRaster,
  name: string,
  calibration: Calibration | null | undefined = null
): ProjectImage => ({
  id: `img-${Date.now()}`,
  name,
  width: raster.width,
  height: raster.height,
  data: bytesToBase64(raster.data),
  calibration,
});

export const projectImageToRaster = (image: ProjectImage): ImageRaster => ({
  width: image.width,
  height: image.height,
  data: base64ToBytes(image.data),
});

export const createProject = (
  name: string,
  images: ProjectImage[],
  channels: Project['channels'],
  layers: Project['layers']
): Project => {
  const now = new Date().toISOString();
  return {
    format: PROJECT_FORMAT,
    version: PROJECT_VERSION,
    name,
    createdAt: now,
    updatedAt: now,
    images,
    channels,
    layers,
  };
};

export const serializeProject = (project: Project): string =>
  JSON.stringify(project, null, 2);

export const deserializeProject = (text: string): Project => {
  const parsed = projectSchema.safeParse(JSON.parse(text));
  if (!parsed.success) {
    throw new Error('Invalid project bundle');
  }
  return parsed.data;
};
