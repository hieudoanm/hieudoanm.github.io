import type { OPMParams, OpmResult, SnrPoint } from './types';

/** Open-field (unshielded) ambient noise reaching the scalp, nT. */
const OPEN_FIELD_NT = 180;

/** Residual fraction left by a high-permeability shield. */
const SHIELD_FACTOR = 0.005;

/** A cryogenic helmet sensor sits about 4 cm from the nearest cortex. */
const HELMET_GAP_CM = 4;

/** Cryogenic MEG instrument noise floor, nT. */
const HELMET_NOISE_NT = 0.03;

/**
 * Dipolar field magnitude at distance r: |B| ∝ 1/r³. This cubic falloff is the
 * single most important fact about magnetometry — halve the distance and you
 * gain 8×, not 2×.
 */
export const fieldAt = (sourceStrength: number, distanceCm: number): number =>
  sourceStrength / distanceCm ** 3;

export const ambientAt = (params: OPMParams): number =>
  params.shielded
    ? OPEN_FIELD_NT * SHIELD_FACTOR * (params.ambientNT / OPEN_FIELD_NT)
    : params.ambientNT;

export const snrAt = (
  sourceStrength: number,
  distanceCm: number,
  noiseNT: number
): number => fieldAt(sourceStrength, distanceCm) / Math.max(noiseNT, 1e-9);

export const runOpmSimulation = (params: OPMParams): OpmResult => {
  const noise = Math.hypot(ambientAt(params), params.sensorNoiseNT);
  const totalDistance = params.sourceDepthCm + params.sensorGapCm;

  const curve: SnrPoint[] = Array.from({ length: 40 }, (_, i) => {
    const distanceCm = 0.5 + i * 0.25;
    const signalNT = fieldAt(params.sourceStrength, distanceCm);
    return {
      distanceCm,
      signalNT,
      noiseNT: noise,
      snr: signalNT / Math.max(noise, 1e-9),
    };
  });

  // A cryogenic helmet senses the same source from further out, so its
  // distance includes the same cortical depth.
  const helmetDistance = params.sourceDepthCm + HELMET_GAP_CM;
  const helmetNoise = Math.hypot(
    ambientAt({ ...params, ambientNT: OPEN_FIELD_NT }),
    HELMET_NOISE_NT
  );

  const opmSnr = snrAt(params.sourceStrength, totalDistance, noise);
  const helmetSnr = snrAt(params.sourceStrength, helmetDistance, helmetNoise);

  return {
    curve,
    helmetSnr,
    opmSnr,
    gain: opmSnr / Math.max(helmetSnr, 1e-9),
    residualAmbientNT: ambientAt(params),
  };
};

/** Optimal sensor placement: the closest sensor to the source carries the signal. */
export const bestSensor = (curve: SnrPoint[]): SnrPoint =>
  curve.reduce((a, b) => (b.snr > a.snr ? b : a), curve[0]);
