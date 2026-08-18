export type ChessClockSide = 'player1' | 'player2';
export type DelayType = 'none' | 'delay' | 'fischer' | 'bronstein';
export type Stage = 'setup' | 'preview' | 'running' | 'paused';
export interface ClockState {
  player1: number;
  player2: number;
  turn: ChessClockSide | null;
  stage: Stage;
  delayType: DelayType;
  delaySeconds: number;
  increment: number;
  ticker: number | null;
  p1Moves: number;
  p2Moves: number;
  p1Delay: number;
  p2Delay: number;
  hist: string[];
  startTime: number | null;
  endTime: number | null;
  winner: ChessClockSide | null;
}
export interface Preset {
  label: string;
  p1: number;
  p2: number;
  delayType: DelayType;
  delaySeconds: number;
  increment: number;
}
