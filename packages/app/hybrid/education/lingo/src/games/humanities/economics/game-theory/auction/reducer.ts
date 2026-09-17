import {
  planBids,
  resolveAuction,
  sampleEstimate,
  sampleTrueValue,
} from './game';
import { PLAYER_ID, TOTAL_ROUNDS } from './constants';
import type { AuctionFormat, BidderChoice, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  format: AuctionFormat | null;
  trueValue: number;
  playerEstimate: number;
  bids: BidderChoice[];
  playerBid: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalProfit: number;
}

export type GameAction =
  | { type: 'START_ROUND'; format: AuctionFormat }
  | { type: 'SUBMIT_BID'; amount: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  format: null,
  trueValue: 0,
  playerEstimate: 0,
  bids: [],
  playerBid: null,
  result: null,
  results: [],
  totalProfit: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_ROUND': {
      const trueValue = sampleTrueValue();
      return {
        ...state,
        phase: 'choose',
        format: action.format,
        trueValue,
        playerEstimate: sampleEstimate(trueValue),
        bids: planBids(trueValue),
        playerBid: null,
        result: null,
      };
    }
    case 'SUBMIT_BID': {
      if (!state.format || state.phase !== 'choose') return state;
      const bids: Record<string, number> = Object.fromEntries(
        state.bids.map((b) => [b.botId, b.bid])
      );
      bids[PLAYER_ID] = action.amount;
      const { winner, price } = resolveAuction(bids, state.format);
      const playerPayoff = payoff(winner, price, state.trueValue);
      const result: RoundResult = {
        round: state.round,
        format: state.format,
        trueValue: state.trueValue,
        estimates: Object.fromEntries(
          state.bids.map((b) => [b.botId, b.estimate])
        ),
        bids,
        winner,
        price,
        playerPayoff,
      };
      return { ...state, phase: 'reveal', playerBid: action.amount, result };
    }
    case 'NEXT_ROUND':
      if (!state.result) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results: [...state.results, state.result],
          totalProfit: [...state.results, state.result].reduce(
            (sum, r) => sum + r.playerPayoff,
            0
          ),
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results: [...state.results, state.result],
        totalProfit: [...state.results, state.result].reduce(
          (sum, r) => sum + r.playerPayoff,
          0
        ),
        format: null,
        result: null,
        playerBid: null,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

const payoff = (winner: string, price: number, trueValue: number): number =>
  winner === 'player' ? trueValue - price : 0;
