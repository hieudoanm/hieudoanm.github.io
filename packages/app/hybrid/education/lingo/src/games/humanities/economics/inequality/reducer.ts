import { POVERTY_LINE, ROUNDS, TOTAL_ROUNDS } from './constants';
import {
  afterPolicy,
  gini,
  giniAfter,
  povertyHeadcount,
  scoreRound,
} from './game';
import type { GamePhase, RoundOutcome } from './types';

export interface GameState {
  phase: GamePhase;
  round: number;
  taxInput: number;
  outcome: RoundOutcome | null;
  outcomes: RoundOutcome[];
  totalScore: number;
}

export type GameAction =
  | { type: 'SET_TAX'; value: number }
  | { type: 'SUBMIT' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'play',
  round: 1,
  taxInput: 0,
  outcome: null,
  outcomes: [],
  totalScore: 0,
});

const meanOf = (incomes: number[]): number =>
  incomes.reduce((sum, v) => sum + v, 0) / (incomes.length || 1);

const buildOutcome = (state: GameState): RoundOutcome => {
  const spec = ROUNDS[state.round - 1];
  const tax = state.taxInput;
  const baseGini = gini(spec.incomes);
  const after = giniAfter(spec.incomes, tax);
  const rebate = tax * meanOf(spec.incomes);
  const povertyBefore = povertyHeadcount(spec.incomes, POVERTY_LINE);
  const povertyAfter = povertyHeadcount(
    afterPolicy(spec.incomes, tax),
    POVERTY_LINE
  );
  const score = scoreRound(tax, spec.target);
  return {
    round: state.round,
    baseGini,
    chosenTax: tax,
    afterGini: after,
    rebate,
    povertyBefore,
    povertyAfter,
    score,
    winning: score === 3,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_TAX':
      return { ...state, taxInput: action.value };
    case 'SUBMIT':
      if (state.phase !== 'play') return state;
      return {
        ...state,
        phase: 'reveal',
        outcome: buildOutcome(state),
      };
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.outcome) return state;
      const outcomes = [...state.outcomes, state.outcome];
      const totalScore = outcomes.reduce((sum, o) => sum + o.score, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', outcomes, totalScore };
      }
      return {
        ...state,
        phase: 'play',
        round: state.round + 1,
        taxInput: 0,
        outcome: null,
        outcomes,
        totalScore,
      };
    }
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
