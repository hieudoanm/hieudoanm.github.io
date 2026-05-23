import type { AttractorType, AttractorSettings } from './types';

export const SETTINGS: Record<AttractorType, AttractorSettings> = {
  lorenz: {
    scale: 0.5,
    dt: 0.005,
    cam: 35,
    offset: [0, 0, 25],
    color: [0.55, 0.1],
  },
  aizawa: {
    scale: 10,
    dt: 0.01,
    cam: 22,
    offset: [0, 0, 0],
    color: [0.85, 0.1],
  },
  thomas: {
    scale: 5,
    dt: 0.05,
    cam: 14,
    offset: [0, 0, 0],
    color: [0.6, 0.15],
  },
  halvorsen: {
    scale: 2,
    dt: 0.008,
    cam: 20,
    offset: [0, 0, 0],
    color: [0.08, 0.08],
  },
  arneodo: {
    scale: 2.5,
    dt: 0.01,
    cam: 20,
    offset: [0, 0, 0],
    color: [0.0, 0.1],
  },
};

export const NUM_PARTICLES = 8000;
