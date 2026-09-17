export type Phase = 'lab' | 'quiz' | 'done';

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  questionId: number;
  selected: number;
  correct: boolean;
}

export interface CostRow {
  L: number;
  Q: number;
  MP: number;
  AP: number;
  TVC: number;
  TFC: number;
  TC: number;
  MC: number;
  ATC: number;
  AVC: number;
  AFC: number;
}
