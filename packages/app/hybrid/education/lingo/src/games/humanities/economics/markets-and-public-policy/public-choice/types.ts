export type Mode = 'median' | 'paradox' | 'rent';

export type Phase = 'plan' | 'check' | 'done';

export interface Voter {
  id: string;
  ideal: number;
}

export interface ParadoxOption {
  id: string;
  name: string;
  emoji: string;
}

export interface MedianResult {
  playerPlatform: number;
  botPlatform: number;
  votesForPlayer: number;
  votesForBot: number;
  winner: 'player' | 'bot' | 'tie';
}

export interface ParadoxStep {
  a: string;
  b: string;
  winner: string;
}

export interface ParadoxResult {
  firstPair: [string, string];
  supported: string;
  steps: ParadoxStep[];
  finalWinner: string;
}

export interface RentResult {
  playerSpend: number;
  botSpend: number;
  winProbability: number;
  won: boolean;
  netPayoff: number;
  expectedPayoff: number;
}

export interface RoundResult {
  round: number;
  mode: Mode;
  won: boolean;
  detail: MedianResult | ParadoxResult | RentResult;
}
