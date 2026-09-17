import { BOTS, MAX_VALUE, MIN_VALUE, NOISE } from './constants';
import type { AuctionFormat, BidderChoice, Bot } from './types';

const rand = (min: number, max: number): number =>
  Math.round(min + Math.random() * (max - min));

export const sampleTrueValue = (): number => rand(MIN_VALUE, MAX_VALUE);

export const sampleEstimate = (trueValue: number): number =>
  Math.max(1, rand(trueValue - NOISE, trueValue + NOISE));

export const shadeBid = (estimate: number, bot: Bot): number =>
  Math.round(estimate * bot.shading);

export const planBids = (
  trueValue: number,
  bots: Bot[] = BOTS
): BidderChoice[] =>
  bots.map((bot) => {
    const estimate = sampleEstimate(trueValue);
    return { botId: bot.id, estimate, bid: shadeBid(estimate, bot) };
  });

export const resolveAuction = (
  bids: Record<string, number>,
  format: AuctionFormat
): { winner: string; price: number } => {
  const ranked = Object.entries(bids).sort(
    ([ida, a], [idb, b]) => b - a || ida.localeCompare(idb)
  );
  const winner = ranked[0][0];
  const price =
    format === 'vickrey' ? (ranked[1]?.[1] ?? ranked[0][1]) : ranked[0][1];
  return { winner, price };
};

export const payoffFor = (
  winner: string,
  price: number,
  trueValue: number
): number => (winner === 'player' ? trueValue - price : 0);

export const isWinnerCurse = (payoff: number): boolean => payoff < 0;
