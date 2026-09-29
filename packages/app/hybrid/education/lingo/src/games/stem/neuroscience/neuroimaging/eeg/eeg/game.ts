import type {
  ErpComponent,
  ErpParams,
  ErpTrace,
  ArtefactSettings,
} from './types';

/** Deterministic Box–Muller so a given seed always reproduces the same trace. */
const sampleNormal = (seed: number): number => {
  const u = Math.max(seed % 1, 1e-9);
  const v = Math.max(((seed * 9301 + 49297) % 1) / 233280, 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const gauss = (t: number, mean: number, sd: number): number => {
  const z = (t - mean) / sd;
  return Math.exp(-0.5 * z * z);
};

export const sumComponents = (
  components: ErpComponent[],
  times: number[]
): number[] =>
  times.map((t) =>
    components.reduce(
      (sum, c) => sum + c.amplitude * gauss(t, c.latency, c.width),
      0
    )
  );

const addArtefacts = (
  clean: number[],
  times: number[],
  settings: ArtefactSettings
): number[] =>
  times.map((t, i) => {
    const n = i * 0.017;
    const blink =
      settings.blink * -40 * gauss(t, 250, 60) +
      settings.blink * 15 * gauss(t, 380, 120);
    const emg = settings.emg * 8 * Math.sin(n * 7.3) * (t > 100 ? 1 : 0.1);
    const line =
      settings.lineNoise * 12 * Math.sin((2 * Math.PI * 50 * t) / 1000);
    const drift = settings.drift * 20 * (t / 1000) ** 2;
    return clean[i] + blink + emg + line + drift;
  });

export const buildTimeAxis = (params: ErpParams): number[] => {
  const n = Math.round((params.windowMs / 1000) * params.sampleRate);
  return Array.from({ length: n }, (_, i) => i * (1000 / params.sampleRate));
};

/**
 * Simulates `nTrials` single-trial recordings and averages them. The clean
 * component structure is identical on every trial; only the noise differs,
 * which is what makes averaging cancel it.
 */
export const simulateErp = (
  params: ErpParams,
  nTrials: number,
  seed = 1
): ErpTrace & { noiseBefore: number; noiseAfter: number } => {
  const times = buildTimeAxis(params);
  const clean = sumComponents(params.components, times);
  const contaminated = addArtefacts(clean, times, params.artefacts);

  // Per-trial noise, ~4 uV RMS, plus the artefacts.
  const trials = Array.from({ length: nTrials }, (_, trial) =>
    contaminated.map(
      (v, i) => v + 4 * sampleNormal(seed + (trial + 1) * 7919 + i * 0.31)
    )
  );

  const signal = times.map((_, i) => {
    const sum = trials.reduce((acc, t) => acc + t[i], 0);
    return sum / nTrials;
  });

  // Same total noise power, before and after averaging, for the comparison card.
  const perTrialNoise = Math.sqrt(
    trials.reduce(
      (acc, t) => acc + t.reduce((s, v, i) => s + (v - clean[i]) ** 2, 0),
      0
    ) /
      (nTrials * clean.length)
  );

  return {
    times,
    signal,
    contaminated,
    noiseBefore: perTrialNoise,
    noiseAfter: perTrialNoise / Math.sqrt(nTrials),
  };
};

/**
 * Evidence strength as a DDM drift rate. Higher evidence moves every
 * latency-relative component earlier and scales the decision-stage component,
 * which is the physiological prediction the DDM makes about ERP latency.
 */
export const evidenceToDrift = (coherence: number): number =>
  0.6 + 2.2 * Math.min(Math.max(coherence, 0), 1);

export const scaleComponentsForEvidence = (
  components: ErpComponent[],
  coherence: number
): ErpComponent[] => {
  const v = evidenceToDrift(coherence);
  return components.map((c) => ({
    ...c,
    // Latency compresses with evidence strength; amplitude scales with it.
    latency: c.latency / (0.75 + 0.35 * v),
    amplitude: c.amplitude * (0.6 + 0.5 * v),
  }));
};
