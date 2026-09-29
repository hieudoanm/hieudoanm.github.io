export type Phase = 'choose' | 'reveal' | 'done';

export interface Bot {
  id: string;
  name: string;
  emoji: string;
  give: number;
}

export interface RoundResult {
  round: number;
  playerGive: number;
  gives: Record<string, number>;
}
