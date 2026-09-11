export type RoundKind =
  'anchored' | 'availability' | 'representativeness' | 'control';

export interface RoundItem {
  id: string;
  kind: RoundKind;
  question: string;
  story: string;
  anchor: number | null;
  anchorText: string | null;
  trueAnswer: number;
  unit: string;
  trueText?: string;
  lesson: string;
}

export interface ConjunctionGuess {
  base: number;
  overlap: number;
  adhered: boolean;
}

export interface RoundResult {
  roundId: string;
  guess: number;
  conjunction?: ConjunctionGuess;
  error: number;
  points: number;
}

export interface AnchoringReport {
  anchoredAvgError: number;
  controlError: number;
  drifted: boolean;
  summary: string;
}

export type Phase = 'answer' | 'reveal' | 'done';
