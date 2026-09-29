import {
  applyVolumeConduction,
  buildSensors,
  dot,
  norm,
  scale,
  sensorVec,
  sub,
} from './forward';
import type { Vec3 } from './forward';
import type {
  DipoleParams,
  FieldSample,
  ForwardResult,
  SensorPoint,
} from './types';

const RAD = Math.PI / 180;

/** Distance from the head centre to the cortical surface, cm. */
const HEAD_RADIUS_CM = 8;

/** A cryogenic MEG helmet sensor sits about this far outside the scalp. */
export const HELMET_GAP_CM = 4;

/** An on-scalp OPM sits well under 1 cm outside the scalp. */
export const SCALP_GAP_CM = 1;

/**
 * Source sits `depthCm` below the cortical surface, measured toward the -Z
 * pole. Depth is clamped so a source can never pass through the far side of the
 * head.
 */
const sourceVec = (params: DipoleParams): Vec3 => {
  const radius = Math.max(HEAD_RADIUS_CM - params.depthCm, 0.2);
  const tilt = params.orientationDeg * RAD;
  return {
    x: Math.sin(tilt) * radius,
    y: 0,
    z: -Math.cos(tilt) * radius,
  };
};

/** Radially outward unit moment at the source, rotated toward +X. */
const dipoleVec = (params: DipoleParams): Vec3 => {
  const tilt = params.orientationDeg * RAD;
  return { x: Math.sin(tilt), y: 0, z: -Math.cos(tilt) };
};

/** |B| for a current dipole: B = (3 r̂ (p·r̂) − p) / r³ */
const magneticField = (p: Vec3, r: Vec3): number => {
  const rMag = norm(r);
  if (rMag === 0) return 0;
  const rHat = scale(r, 1 / rMag);
  const pd = dot(p, rHat);
  const b = {
    x: 3 * rHat.x * pd - p.x,
    y: 3 * rHat.y * pd - p.y,
    z: 3 * rHat.z * pd - p.z,
  };
  return norm(b) / rMag ** 3;
};

/** Scalp potential: V ∝ (p·r̂) / r² */
const electricPotential = (p: Vec3, r: Vec3): number => {
  const rMag = norm(r);
  return rMag === 0 ? 0 : dot(p, r) / rMag ** 3;
};

export const runForwardModel = (
  params: DipoleParams,
  sensorCount = 180
): ForwardResult => {
  const sensors = buildSensors(sensorCount);
  const src = sourceVec(params);
  const dip = dipoleVec(params);
  const sensorRadius = HEAD_RADIUS_CM + params.sensorGapCm;

  const offsets = sensors.map((s) => sub(sensorVec(s, sensorRadius), src));
  const raw = offsets.map((offset, i) => ({
    sensor: sensors[i],
    magnetic: magneticField(dip, offset),
    electric: electricPotential(dip, offset),
  }));

  const smeared = applyVolumeConduction(
    raw.map((r) => r.electric),
    sensors,
    params.skullRatio
  );

  const samples: FieldSample[] = raw.map((r, i) => ({
    ...r,
    volumeConducted: smeared[i],
  }));

  const peak = (key: 'magnetic' | 'electric' | 'volumeConducted'): number =>
    Math.max(...samples.map((s) => Math.abs(s[key])));

  return {
    samples,
    peakMagnetic: peak('magnetic'),
    peakElectric: peak('electric'),
    peakVolumeConducted: peak('volumeConducted'),
    minDistanceCm: Math.min(...offsets.map(norm)),
  };
};

/**
 * B falls off as 1/r³, so a sensor 1 cm from the cortex sees 64× the field of
 * one 4 cm away. This is the core argument for on-scalp magnetometers.
 */
export const fieldAtDistance = (rCm: number): number => 1 / rCm ** 3;

/** Signal gain of an on-scalp sensor over a helmet, from distance alone. */
export const onScalpGain = (
  helmetCm = HELMET_GAP_CM,
  scalpCm = SCALP_GAP_CM
): number => fieldAtDistance(scalpCm) / fieldAtDistance(helmetCm);

export type { SensorPoint };
