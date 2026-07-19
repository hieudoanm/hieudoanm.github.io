import { QUOTES, TOTAL_ROUNDS } from './constants';
import { arbProfit, consistencyRatio, impliedCross, tradeRound } from './game';
import type { FxRates, Phase, RoundResult, TrianglePathId } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  rates: FxRates;
  pathId: TrianglePathId | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalProfit: number;
}

export type GameAction =
  | { type: 'PICK_PATH'; pathId: TrianglePathId }
  | { type: 'EXECUTE'; budget: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  rates: QUOTES[0],
  pathId: null,
  result: null,
  results: [],
  totalProfit: 0,
});

export const bestPathFor = (rates: FxRates): TrianglePathId =>
  consistencyRatio(rates) >= 1 ? 'usd_eur_jpy_usd' : 'usd_jpy_eur_usd';

const buildResult = (state: GameState, budget: number): RoundResult => {
  const { rates, round, pathId } = state;
  const usedPath = pathId as TrianglePathId;
  const finalUsd = tradeRound(budget, usedPath, rates);
  const best = bestPathFor(rates);
  return {
    round,
    rates,
    pathId: usedPath,
    finalUsd,
    profit: finalUsd - budget,
    impliedCross: impliedCross(rates.usdPerEur, rates.jpyPerUsd),
    ratio: consistencyRatio(rates),
    profitable: finalUsd - budget > 0,
    bestPath: best,
    arbitrageProfit: arbProfit(budget, best, rates),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'PICK_PATH':
      if (state.phase !== 'choose') return state;
      return { ...state, pathId: action.pathId };
    case 'EXECUTE': {
      if (state.phase !== 'choose' || !state.pathId) return state;
      if (!Number.isFinite(action.budget) || action.budget <= 0) return state;
      return {
        ...state,
        phase: 'reveal',
        result: buildResult(state, action.budget),
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const totalProfit = results.reduce((sum, r) => sum + r.profit, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results, totalProfit };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        rates: QUOTES[state.round],
        pathId: null,
        result: null,
        results,
        totalProfit,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
