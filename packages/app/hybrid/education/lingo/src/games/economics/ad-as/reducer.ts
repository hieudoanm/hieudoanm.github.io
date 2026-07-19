import { AD_SHOCKS, TOTAL_ROUNDS } from './constants';
import {
  gapPercent,
  gapSign,
  longRunPrice,
  priceDirection,
  shortRunOutput,
  shortRunPrice,
} from './game';
import type { GapSign, Phase, PriceDirection, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  currentA: number;
  previousA: number | null;
  rounds: RoundResult[];
  score: number;
  result: RoundResult | null;
}

export type GameAction =
  | { type: 'RESET' }
  | { type: 'SUBMIT_PREDICTIONS'; gap: GapSign; price: PriceDirection }
  | { type: 'NEXT_ROUND' };

export const createInitialState = (): GameState => ({
  phase: 'predict',
  round: 1,
  currentA: AD_SHOCKS[0],
  previousA: null,
  rounds: [],
  score: 0,
  result: null,
});

const buildResult = (
  state: GameState,
  gap: GapSign,
  price: PriceDirection
): RoundResult => {
  const expectedGap = gapSign(state.currentA);
  const expectedPrice =
    state.previousA === null
      ? 'same'
      : priceDirection(state.currentA, state.previousA);
  const gapCorrect = gap === expectedGap;
  const priceCorrect = price === expectedPrice;
  return {
    round: state.round,
    a: state.currentA,
    gapPick: gap,
    pricePick: price,
    expectedGap,
    expectedPrice,
    shortRunPrice: shortRunPrice(state.currentA),
    shortRunOutput: shortRunOutput(state.currentA),
    gapPercent: gapPercent(state.currentA),
    longRunPrice: longRunPrice(state.currentA),
    gapCorrect,
    priceCorrect,
    points: (gapCorrect ? 1 : 0) + (priceCorrect ? 1 : 0),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_PREDICTIONS': {
      if (state.phase !== 'predict') return state;
      return {
        ...state,
        phase: 'reveal',
        result: buildResult(state, action.gap, action.price),
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const rounds = [...state.rounds, state.result];
      const score = sumPoints(rounds);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', rounds, score, result: null };
      }
      return {
        ...state,
        phase: 'predict',
        round: state.round + 1,
        currentA: AD_SHOCKS[state.round],
        previousA: state.currentA,
        rounds,
        score,
        result: null,
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

const sumPoints = (rounds: RoundResult[]): number =>
  rounds.reduce((sum, r) => sum + r.points, 0);
