export interface HrfParams {
  /** Time to peak of the positive haemodynamic response, seconds */
  peakTimeS: number;
  /** Dispersion of the response, seconds */
  dispersionS: number;
  /** Ratio of undershoot to peak (negative = undershoot) */
  undershootRatio: number;
  /** Time constant of the undershoot, seconds */
  undershootTimeS: number;
}

export interface BOLDParams {
  hrf: HrfParams;
  /** Stimulus duration in seconds */
  blockS: number;
  /** Inter-block interval in seconds */
  isiS: number;
  /** Block repetition rate in Hz (0 = a single block) */
  blockHz: number;
  /** Repetition time, seconds */
  trS: number;
  /** Neural noise SD, arbitrary units */
  neuralNoise: number;
  /** Physiological noise SD, arbitrary units */
  physioNoise: number;
}

export interface BoldSample {
  timeS: number;
  /** Continuous neural drive */
  neural: number;
  /** Neural drive convolved with the HRF (BOLD proxy) */
  bold: number;
  /** BOLD sampled at the repetition time, with noise */
  sampled: number;
}

export interface BoldResult {
  samples: BoldSample[];
  /** Volume time constant of the vasculature, seconds */
  t1S: number;
  /** Effective T2* the volume sequence actually samples, seconds */
  t2StarS: number;
  /**
   * Vascular delay: time from a neural impulse to the peak of the haemodynamic
   * response. Measured from the impulse response, so it does not depend on
   * block length or noise.
   */
  boldLagS: number;
  /** Peak BOLD amplitude, arbitrary units */
  peakBold: number;
  trSamples: number;
  windowS: number;
}
