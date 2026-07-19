import type { AttractorFn, AttractorType } from '../types';

export const lorenz: AttractorFn = (x, y, z) => {
  const s = 10,
    r = 28,
    b = 8 / 3;
  return [s * (y - x), x * (r - z) - y, x * y - b * z];
};

export const aizawa: AttractorFn = (x, y, z) => {
  const a = 0.95,
    b = 0.7,
    c = 0.6,
    d = 3.5,
    e = 0.25,
    f = 0.1;
  return [
    (z - b) * x - d * y,
    d * x + (z - b) * y,
    c +
      a * z -
      (z * z * z) / 3 -
      (x * x + y * y) * (1 + e * z) +
      f * z * x * x * x,
  ];
};

export const thomas: AttractorFn = (x, y, z) => {
  const b = 0.208186;
  return [Math.sin(y) - b * x, Math.sin(z) - b * y, Math.sin(x) - b * z];
};

export const halvorsen: AttractorFn = (x, y, z) => {
  const a = 1.89;
  return [
    -a * x - 4 * y - 4 * z - y * y,
    -a * y - 4 * z - 4 * x - z * z,
    -a * z - 4 * x - 4 * y - x * x,
  ];
};

export const arneodo: AttractorFn = (x, y, z) => {
  const a = -5.5,
    b = 3.5,
    c = -1;
  return [y, z, -a * x - b * y - z + c * x * x * x];
};

export const ATTRACTOR_FNS: Record<AttractorType, AttractorFn> = {
  lorenz,
  aizawa,
  thomas,
  halvorsen,
  arneodo,
};
