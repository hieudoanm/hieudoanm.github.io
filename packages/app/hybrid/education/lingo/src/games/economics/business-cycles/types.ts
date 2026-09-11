export type PhaseLabel = 'expansion' | 'peak' | 'trough' | 'recession';

export type Phase = 'predict' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  actual: number;
  predicted: number | null;
  category: ExpansionCategory | null;
  phase: PhaseLabel;
  score: number;
}

export type ExpansionCategory = 'expansion' | 'recession';

export interface HistoryRow {
  round: number;
  actual: number;
  phase: PhaseLabel;
  peak: boolean;
  trough: boolean;
}
