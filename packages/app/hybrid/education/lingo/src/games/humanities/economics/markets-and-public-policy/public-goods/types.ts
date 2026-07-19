export type Phase = 'choose' | 'reveal' | 'done';

export type BotId = 'hana' | 'marco' | 'bea';

export interface Bot {
  id: BotId;
  name: string;
  emoji: string;
}

export interface RoundResult {
  round: number;
  myContribution: number;
  contributions: Record<string, number>;
  payoffs: Record<string, number>;
  myPayoff: number;
}

export interface Ranking {
  id: string;
  name: string;
  emoji: string;
  total: number;
}
