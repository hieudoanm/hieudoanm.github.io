export type StudyId = 'A' | 'B';

export type Phase = 'choose' | 'reveal' | 'done';

export type ToleranceKind = 'absolute' | 'relative';

export interface Study {
  id: StudyId;
  label: string;
  treatedMean: number;
  treatedSd: number;
  treatedN: number;
  controlMean: number;
  controlSd: number;
  controlN: number;
  randomized: boolean;
}

export interface Round {
  number: number;
  topic: string;
  question: string;
  outcome: string;
  unit: string;
  trueEffect: number;
  tolerance: number;
  toleranceKind: ToleranceKind;
  studies: [Study, Study];
  reveal: string;
}

export interface RoundResult {
  round: number;
  topic: string;
  chosenStudy: StudyId;
  estimate: number;
  diff: number;
  correctStudy: boolean;
  correctEstimate: boolean;
  points: number;
  reveal: string;
}

export type Allocation = '50/50' | '70/30';

export interface TrialRun {
  treatedShare: number;
  treatedN: number;
  controlN: number;
  observedAte: number;
  se: number;
  t: number;
  pValue: number;
  ciLower: number;
  ciUpper: number;
  significant: boolean;
  power: number;
}
