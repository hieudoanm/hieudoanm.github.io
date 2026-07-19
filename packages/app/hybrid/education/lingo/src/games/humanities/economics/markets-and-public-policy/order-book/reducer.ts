import { LIMIT_PRICE, START_MID, TOTAL_ROUNDS } from './constants';
import { crossAway, limitFill, nextMid, roundTripCost } from './game';
import type { Action, Fill, GameState, RoundResult } from './types';

export type GameAction =
  | { type: 'SUBMIT_ACTION'; action: Action; step: 1 | -1 }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

interface Resolved {
  newMid: number;
  fill: Fill;
  fillPrice: number | null;
  delta: number;
  cashDelta: number;
  spreadCost: number;
}

const resolveRound = (action: Action, mid: number, step: 1 | -1): Resolved => {
  const newMid = nextMid(mid, step);
  const spreadCost = roundTripCost(action, mid);
  if (action === 'buy-ask' || action === 'sell-bid') {
    const { price, delta } = crossAway(action, mid);
    return {
      newMid,
      spreadCost,
      fill: action === 'buy-ask' ? 'buy' : 'sell',
      fillPrice: price,
      delta,
      cashDelta: -delta * price,
    };
  }
  const buyPrice = action === 'post-bid' ? LIMIT_PRICE : null;
  const sellPrice = action === 'post-ask' ? LIMIT_PRICE : null;
  const fill = limitFill(buyPrice, sellPrice, newMid);
  const fillPrice = fill === 'none' ? null : LIMIT_PRICE;
  const delta = fill === 'buy' ? 1 : fill === 'sell' ? -1 : 0;
  return {
    newMid,
    spreadCost,
    fill,
    fillPrice,
    delta,
    cashDelta: -delta * (fillPrice ?? 0),
  };
};

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  mid: START_MID,
  cash: 0,
  position: 0,
  volume: 0,
  spreadCost: 0,
  roundResult: null,
  results: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_ACTION': {
      if (state.phase !== 'choose') return state;
      const resolved = resolveRound(action.action, state.mid, action.step);
      const cash = state.cash + resolved.cashDelta;
      const position = state.position + resolved.delta;
      const volume = state.volume + Math.abs(resolved.delta);
      const spreadCost = state.spreadCost + resolved.spreadCost;
      const roundResult: RoundResult = {
        round: state.round,
        action: action.action,
        midBefore: state.mid,
        midAfter: resolved.newMid,
        fill: resolved.fill,
        fillPrice: resolved.fillPrice,
        delta: resolved.delta,
        cashDelta: resolved.cashDelta,
        spreadCost: resolved.spreadCost,
        totalSpreadCost: spreadCost,
        cash,
        position,
        volume,
      };
      return {
        ...state,
        phase: 'reveal',
        mid: resolved.newMid,
        cash,
        position,
        volume,
        spreadCost,
        roundResult,
      };
    }
    case 'NEXT_ROUND': {
      if (!state.roundResult) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results: [...state.results, state.roundResult],
          roundResult: null,
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results: [...state.results, state.roundResult],
        roundResult: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _exhaustive: never = action;
      return state;
  }
};
