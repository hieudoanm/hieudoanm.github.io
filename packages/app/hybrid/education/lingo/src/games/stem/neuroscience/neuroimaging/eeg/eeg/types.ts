export interface ErpComponent {
  name: string;
  /** Peak latency in milliseconds */
  latency: number;
  /** Peak amplitude in microvolts; negative is plotted downward */
  amplitude: number;
  /** Width (standard deviation) of the gaussian in milliseconds */
  width: number;
}

export interface ArtefactSettings {
  blink: number;
  emg: number;
  lineNoise: number;
  drift: number;
}

export interface ErpParams {
  components: ErpComponent[];
  artefacts: ArtefactSettings;
  sampleRate: number;
  windowMs: number;
}

export interface ErpTrace {
  times: number[];
  /** ERP average, baseline-corrected, in microvolts */
  signal: number[];
  /** The same trace plus injected artefacts, in microvolts */
  contaminated: number[];
}
