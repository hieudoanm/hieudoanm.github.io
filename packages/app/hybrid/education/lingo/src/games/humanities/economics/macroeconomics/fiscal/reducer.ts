import { MAX_LEVER, MIN_LEVER, ROUNDS, TOTAL_ROUNDS } from './constants';
import { closingY, fiscalCost, residual, scoreRound } from './game';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  gap: number;
  mpc: number;
  g: number;
  tau: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | { type: 'SUBMIT'; g: number; tau: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

const clampLever = (n: number): number =>
  Math.max(MIN_LEVER, Math.min(MAX_LEVER, Math.round(n)));

const sumScore = (results: RoundResult[]): number =>
  results.reduce((sum, r) => sum + r.score, 0);

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  gap: ROUNDS[0].gap,
  mpc: ROUNDS[0].mpc,
  g: 0,
  tau: 0,
  result: null,
  results: [],
  totalScore: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT': {
      if (state.phase !== 'choose') return state;
      const g = clampLever(action.g);
      const tau = clampLever(action.tau);
      const gapResidual = residual(g, tau, state.mpc, state.gap);
      const result: RoundResult = {
        round: state.round,
        gap: state.gap,
        mpc: state.mpc,
        g,
        tau,
        closingY: closingY(g, tau, state.mpc),
        gapResidual,
        score: scoreRound(g, tau, state.mpc, state.gap),
        cost: fiscalCost(g, tau),
      };
      return { ...state, phase: 'reveal', g, tau, result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results,
          totalScore: sumScore(results),
        };
      }
      const next = ROUNDS[state.round];
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        gap: next.gap,
        mpc: next.mpc,
        result: null,
        results,
        totalScore: sumScore(results),
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
