export type Phase = 'choose' | 'reveal' | 'done';

export interface Bot {
  id: string;
  name: string;
  emoji: string;
  harvest: number;
}

export interface RoundResult {
  round: number;
  playerHarvest: number;
  botHarvests: Record<string, number>;
  totalHarvest: number;
  stockBefore: number;
  stockAfter: number;
  growth: number;
  collapsed: boolean;
}
