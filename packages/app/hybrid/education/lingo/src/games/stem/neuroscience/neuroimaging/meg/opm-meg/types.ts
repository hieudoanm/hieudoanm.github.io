export interface OPMParams {
  /** Depth of the cortical source below the scalp, cm */
  sourceDepthCm: number;
  /** Distance from the sensor to the nearest cortex, cm */
  sensorGapCm: number;
  /** Source moment, nA·m */
  sourceStrength: number;
  /** Ambient field noise reaching the sensor, nT */
  ambientNT: number;
  /** Instrument noise floor, nT */
  sensorNoiseNT: number;
  /** Number of sensors */
  sensorCount: number;
  /** Whether the sensor is inside a shield */
  shielded: boolean;
}

export interface SnrPoint {
  distanceCm: number;
  /** Signal magnitude at that distance, nT */
  signalNT: number;
  /** Total noise magnitude at that distance, nT */
  noiseNT: number;
  snr: number;
}

export interface OpmResult {
  curve: SnrPoint[];
  /** SNR for a cryogenic helmet sensor at 4 cm */
  helmetSnr: number;
  /** SNR for the OPM at the current gap */
  opmSnr: number;
  /** Multiplicative SNR improvement of OPM over helmet */
  gain: number;
  /** Ambient noise after shielding, nT */
  residualAmbientNT: number;
}
