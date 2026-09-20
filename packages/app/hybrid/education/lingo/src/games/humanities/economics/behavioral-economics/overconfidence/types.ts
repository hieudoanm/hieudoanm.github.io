export type Confidence = 50 | 60 | 70 | 80 | 90 | 100;

export type Option = 'A' | 'B';

export type Phase =
  | 'question'
  | 'reveal'
  | 'aggregate'
  | 'market'
  | 'market-result'
  | 'slider'
  | 'slider-result'
  | 'done';

export interface Question {
  id: string;
  prompt: string;
  optionA: string;
  optionB: string;
  correct: Option;
}

export interface AnsweredQuestion {
  questionIndex: number;
  option: Option;
  confidence: Confidence;
  correct: boolean;
}

export interface Bucket {
  confidence: Confidence;
  correct: number;
  total: number;
  accuracy: number;
  gap: number;
}

export interface MarketOutcome {
  claimed: number;
  actual: number;
  evClaimed: number;
  evActual: number;
  bankroll: number;
  overconfident: boolean;
}
