import {
  BETA_ROUNDS,
  MARKET_RETURN,
  PORTFOLIO_ROUNDS,
  RISK_FREE,
  TARGET_SIGMAS,
  TOTAL_ROUNDS,
} from './constants';
import {
  capmExpectedReturn,
  efficientBonus,
  isOnTarget,
  portfolioStats,
  roundType,
  scoreBeta,
  scorePortfolio,
} from './game';
import type { GameState, RoundResult } from './types';

export type GameAction =
  | { type: 'SUBMIT_PORTFOLIO'; w: number }
  | { type: 'SUBMIT_BETA'; input: number }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  result: null,
  results: [],
  totalScore: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_PORTFOLIO': {
      if (state.phase !== 'choose' || roundType(state.round) !== 'portfolio')
        return state;
      const target = TARGET_SIGMAS[state.round - 1];
      const stats = portfolioStats(action.w);
      const onTarget = isOnTarget(stats.sigma, target);
      const score =
        scorePortfolio(stats.sigma, target) +
        (onTarget ? efficientBonus(action.w, target) : 0);
      const result: RoundResult = {
        round: state.round,
        type: 'portfolio',
        w: action.w,
        stats,
        onTarget,
        target,
        score,
      };
      return { ...state, phase: 'reveal', result };
    }
    case 'SUBMIT_BETA': {
      if (state.phase !== 'choose' || roundType(state.round) !== 'beta')
        return state;
      const beta = BETA_ROUNDS[state.round - PORTFOLIO_ROUNDS - 1];
      const model = capmExpectedReturn(beta, MARKET_RETURN, RISK_FREE);
      const result: RoundResult = {
        round: state.round,
        type: 'beta',
        beta,
        input: action.input,
        model,
        score: scoreBeta(action.input, model),
      };
      return { ...state, phase: 'reveal', result };
    }
    case 'NEXT': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const totalScore = results.reduce((sum, r) => sum + r.score, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', result: null, results, totalScore };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        result: null,
        results,
        totalScore,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
