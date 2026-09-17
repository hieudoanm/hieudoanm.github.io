export type Contract = 'none' | 'full' | 'partial';

export type Effort = 'low' | 'high';

export type Phase = 'contract' | 'effort' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  contract: Contract;
  effort: Effort;
  loss: boolean;
  netWealth: number;
  outOfPocket: number;
  insurerPays: number;
}

export interface GameState {
  phase: Phase;
  round: number;
  totalWealth: number;
  selectedContract: Contract | null;
  selectedEffort: Effort | null;
  roundResult: RoundResult | null;
  roundResults: RoundResult[];
}
