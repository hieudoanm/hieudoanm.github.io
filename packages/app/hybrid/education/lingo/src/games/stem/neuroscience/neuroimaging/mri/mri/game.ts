import type { BOLDParams, BoldResult, BoldSample, HrfParams } from './types';

const DT = 0.02; // integration step, seconds
const KERNEL_S = 30; // the HRF is numerically zero past this point
const T1_S = 0.82; // blood T1 at ~3 T

const sampleNormal = (): number => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/** Lanczos coefficients (g = 7) for the gamma function. */
const LANCZOS = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];

/** Γ(n) for positive n, via the Lanczos approximation. */
const gammaFn = (n: number): number => {
  if (n < 0.5) return Math.PI / (Math.sin(Math.PI * n) * gammaFn(1 - n));
  const z = n - 1;
  let sum = LANCZOS[0];
  for (let i = 1; i < LANCZOS.length; i++) sum += LANCZOS[i] / (z + i);
  const t = z + 7.5;
  return Math.sqrt(2 * Math.PI) * t ** (z + 0.5) * Math.exp(-t) * sum;
};

const gammaPdf = (x: number, shape: number, scale: number): number => {
  if (x <= 0) return 0;
  const k = Math.pow(x / scale, shape - 1);
  return (k * Math.exp(-x / scale)) / (scale * gammaFn(shape));
};

/**
 * Canonical double-gamma HRF: a positive response peaking at `peakTimeS`
 * followed by a negative undershoot. This shape is why BOLD measures blood,
 * not neurons.
 */
export const hrfAt = (t: number, h: HrfParams): number => {
  if (t <= 0) return 0;
  return (
    gammaPdf(t, 6, h.peakTimeS) -
    h.undershootRatio * gammaPdf(t, 16, h.undershootTimeS)
  );
};

/** Block-train drive: on for `blockS`, off for `isiS`, repeating at `blockHz`. */
const neuralDrive = (t: number, params: BOLDParams): number => {
  if (params.blockHz <= 0) return t <= params.blockS ? 1 : 0;
  const period = 1 / params.blockHz;
  if (t > period) return 0;
  return t <= params.blockS ? 1 : 0;
};

export const simulateBold = (params: BOLDParams, windowS = 30): BoldResult => {
  const n = Math.round(windowS / DT);
  const kMax = Math.min(n, Math.round(KERNEL_S / DT) + 1);

  // Precompute the impulse response once.
  const kernel: number[] = new Array(kMax);
  for (let k = 0; k < kMax; k++) kernel[k] = hrfAt(k * DT, params.hrf);

  // The vascular delay is the time to the peak of the impulse response. Measuring
  // it here rather than from the argmax of a block response keeps it independent
  // of block length and of noise.
  const vascularLagS =
    kernel.reduce((best, v, k) => (v > kernel[best] ? k : best), 0) * DT;

  const neural: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    neural[i] =
      neuralDrive(i * DT, params) + params.neuralNoise * sampleNormal();
  }

  // Convolve: BOLD is the neural drive passed through the vascular kernel.
  const convolved: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let k = 0; k <= Math.min(i, kMax - 1); k++)
      sum += neural[i - k] * kernel[k];
    convolved[i] = sum * DT;
  }

  // T2* blurring the volume sequence imposes on top of the vascular delay.
  const t2StarS = 1 / (1 / 0.045 + 1 / T1_S);
  const alpha = 1 - Math.exp(-DT / t2StarS);
  const bold: number[] = new Array(n);
  bold[0] = convolved[0];
  for (let i = 1; i < n; i++) {
    bold[i] = bold[i - 1] + (convolved[i] - bold[i - 1]) * alpha;
  }

  const sampled = bold.map((v) => v + params.physioNoise * sampleNormal());

  const trSamples = Math.max(1, Math.round(windowS / params.trS));
  const samples: BoldSample[] = Array.from({ length: trSamples }, (_, i) => {
    const timeS = i * params.trS;
    const idx = Math.min(n - 1, Math.round(timeS / DT));
    return {
      timeS,
      neural: neural[idx],
      bold: bold[idx],
      sampled: sampled[idx],
    };
  });

  let peakBoldIdx = 0;
  for (let i = 1; i < n; i++) if (bold[i] > bold[peakBoldIdx]) peakBoldIdx = i;

  return {
    samples,
    t1S: T1_S,
    t2StarS,
    boldLagS: vascularLagS,
    peakBold: bold[peakBoldIdx],
    trSamples,
    windowS,
  };
};
