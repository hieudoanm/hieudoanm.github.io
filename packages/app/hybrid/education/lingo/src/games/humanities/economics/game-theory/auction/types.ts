export type AuctionFormat = 'english' | 'dutch' | 'first-price' | 'vickrey';

export type Phase = 'choose' | 'reveal' | 'done';

export interface Bot {
  id: string;
  name: string;
  emoji: string;
  shading: number;
}

export interface RoundResult {
  round: number;
  format: AuctionFormat;
  trueValue: number;
  estimates: Record<string, number>;
  bids: Record<string, number>;
  winner: string;
  price: number;
  playerPayoff: number;
}

export interface BidderChoice {
  botId: string;
  estimate: number;
  bid: number;
}
