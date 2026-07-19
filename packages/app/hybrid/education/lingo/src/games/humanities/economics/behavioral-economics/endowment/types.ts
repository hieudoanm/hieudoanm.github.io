export type Phase = 'wta' | 'wtp' | 'reveal' | 'done';

export interface Item {
  id: string;
  name: string;
  emoji: string;
}

export interface RoundResult {
  round: number;
  item: Item;
  wta: number;
  wtp: number;
  gap: number;
}
