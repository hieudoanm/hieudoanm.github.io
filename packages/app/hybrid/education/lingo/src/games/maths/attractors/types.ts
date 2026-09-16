import type { Color } from 'three';

export type AttractorFn = (
  x: number,
  y: number,
  z: number
) => readonly [number, number, number];

export type AttractorType =
  'lorenz' | 'aizawa' | 'thomas' | 'halvorsen' | 'arneodo';

export interface AttractorSettings {
  scale: number;
  dt: number;
  cam: number;
  offset: readonly [number, number, number];
  color: readonly [number, number];
}

export interface ParticleData {
  x: number;
  y: number;
  z: number;
  targetX?: number;
  targetY?: number;
  targetZ?: number;
  oldColor?: Color;
  newColor?: Color;
}

export interface Transition {
  active: boolean;
  progress: number;
  nextAttractor: AttractorType | null;
  startTime: number;
  duration: number;
}
