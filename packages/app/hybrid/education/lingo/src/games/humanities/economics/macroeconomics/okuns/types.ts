export type Phase = 'intro' | 'steer' | 'estimate' | 'done';

export type ResultKind = 'steer' | 'estimate';

export type CoefficientChoice = 0.2 | 0.3 | 0.4 | 0.5 | 0.6;

export interface ModelParams {
  gStar: number;
  c: number;
  uStar: number;
}

export interface DataPoint {
  growth: number;
  du: number;
}

export interface FittedLine {
  slope: number;
  intercept: number;
}
