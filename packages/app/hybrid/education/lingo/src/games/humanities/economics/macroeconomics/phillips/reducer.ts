import { applyShortRun, computeLongRun, scoreRound } from './game';
import { NATURAL_RATE, SCENARIOS, TOTAL_ROUNDS } from './constants';
import type { Phase, Policy, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  startInflation: number;
  startUnemployment: number;
  naturalRate: number;
  beta: number;
  expectationsInflation: number;
  policy: Policy | null;
  anchor: number;
  newInflation: number | null;
  newUnemployment: number | null;
  lrInflation: number | null;
  sacrifice: number;
  totalScore: number;
  history: RoundResult[];
}

export type GameAction =
  | { type: 'SELECT_POLICY'; policy: Policy }
  | { type: 'CHECK' }
  | { type: 'NEXT_ROUND' }
  | { type: 'SET_ANCHOR'; anchor: number }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'pick',
  round: 1,
  startInflation: SCENARIOS[0].startInflation,
  startUnemployment: SCENARIOS[0].startUnemployment,
  naturalRate: NATURAL_RATE,
  beta: 0.5,
  expectationsInflation: 3,
  policy: null,
  anchor: 50,
  newInflation: null,
  newUnemployment: null,
  lrInflation: null,
  sacrifice: 0,
  totalScore: 0,
  history: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_POLICY':
      if (state.phase !== 'pick') return state;
      return { ...state, policy: action.policy };
    case 'CHECK': {
      if (state.phase !== 'pick' || !state.policy) return state;
      const scenario = SCENARIOS[state.round - 1];
      const { newInflation, newUnemployment } = applyShortRun(
        scenario,
        state.policy,
        state.anchor,
        state.expectationsInflation
      );
      const { lrInflation } = computeLongRun(newInflation, newUnemployment);
      const roundScore = scoreRound(
        scenario,
        state.policy,
        state.anchor,
        state.expectationsInflation
      );
      const result: RoundResult = {
        round: state.round,
        startInflation: state.startInflation,
        startUnemployment: state.startUnemployment,
        policy: state.policy,
        anchor: state.anchor,
        newInflation,
        newUnemployment,
        lrInflation,
      };
      return {
        ...state,
        phase: 'reveal',
        newInflation,
        newUnemployment,
        lrInflation,
        sacrifice: state.sacrifice + Math.abs(newUnemployment - NATURAL_RATE),
        totalScore: state.totalScore + roundScore,
        history: [...state.history, result],
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal') return state;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      const nextRound = state.round + 1;
      const scenario = SCENARIOS[nextRound - 1];
      return {
        ...state,
        phase: 'pick',
        round: nextRound,
        policy: null,
        startInflation: scenario.startInflation,
        startUnemployment: scenario.startUnemployment,
        newInflation: null,
        newUnemployment: null,
        lrInflation: null,
        expectationsInflation:
          state.newInflation ?? state.expectationsInflation,
      };
    }
    case 'SET_ANCHOR':
      return { ...state, anchor: Math.max(0, Math.min(100, action.anchor)) };
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
