import type { SensorPoint } from './types';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const RAD = Math.PI / 180;

export const sub = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z,
});

export const dot = (a: Vec3, b: Vec3): number =>
  a.x * b.x + a.y * b.y + a.z * b.z;

export const scale = (a: Vec3, k: number): Vec3 => ({
  x: a.x * k,
  y: a.y * k,
  z: a.z * k,
});

export const norm = (a: Vec3): number => Math.sqrt(dot(a, a));

export const sensorVec = (s: SensorPoint, radiusCm: number): Vec3 => {
  const az = s.azimuth * RAD;
  const el = s.elevation * RAD;
  return {
    x: radiusCm * Math.cos(el) * Math.sin(az),
    y: radiusCm * Math.sin(el),
    z: radiusCm * Math.cos(el) * Math.cos(az),
  };
};

/**
 * Even distribution of sensors on a sphere via the golden-angle spiral, so the
 * helmet and on-scalp cases can be compared at the same sensor count.
 */
export const buildSensors = (count: number): SensorPoint[] => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => ({
    azimuth: ((i * golden * 180) / Math.PI) % 360,
    elevation: Math.asin(1 - (2 * (i + 0.5)) / count) / RAD,
  }));
};

/**
 * Chord distance between two sensor directions. Every sensor sits on the unit
 * sphere, so the chord is a monotone proxy for the great-circle angle and,
 * unlike an azimuth/elevation Euclidean distance, it stays correct at the poles
 * where the azimuth direction is compressed.
 */
const chordBetween = (a: SensorPoint, b: SensorPoint): number =>
  norm(sub(sensorVec(a, 1), sensorVec(b, 1)));

/** Median nearest-neighbour chord distance, used to size the blur kernel. */
const typicalSpacing = (sensors: SensorPoint[]): number => {
  const nearest = sensors.map((a) =>
    Math.min(...sensors.filter((b) => b !== a).map((b) => chordBetween(a, b)))
  );
  nearest.sort((x, y) => x - y);
  return nearest[Math.floor(nearest.length / 2)] || 0.1;
};

/**
 * Approximates volume conduction by smearing the scalp potential across
 * neighbouring sensors. `skullRatio` of 1 leaves the map untouched; smaller
 * values blur progressively — the physical reason EEG has no principled
 * inverse solution while MEG does.
 *
 * The kernel width tracks the actual sensor spacing, so a denser array blurs by
 * the same physical amount rather than appearing sharper by accident.
 */
export const applyVolumeConduction = (
  potentials: number[],
  sensors: SensorPoint[],
  skullRatio: number
): number[] => {
  if (skullRatio >= 1) return potentials;
  const sigma = typicalSpacing(sensors) * 1.5;
  return potentials.map((potential, i) => {
    let sum = potential;
    let weight = 1;
    for (let j = 0; j < sensors.length; j++) {
      if (i === j) continue;
      const d = chordBetween(sensors[i], sensors[j]);
      if (d > sigma) continue;
      const w = Math.exp(-(d * d) / (2 * (sigma / 2) ** 2));
      sum += potentials[j] * w;
      weight += w;
    }
    return (sum / weight) * skullRatio + potential * (1 - skullRatio);
  });
};
