import {
  MAX_INITIAL_CAPITAL,
  MAX_SAVINGS_RATE,
  MAX_TRANSFER,
  MIN_INITIAL_CAPITAL,
  MIN_SAVINGS_RATE,
  MIN_TRANSFER,
  PRESETS,
} from './constants';
import { buildScenario, minimumTransferFor, simulate } from './game';
import type { Phase, Scenario, SimResult } from './types';

export interface GameState {
  phase: Phase;
  initialCapital: number;
  savingsRate: number;
  subsistence: number;
  transfer: number;
  simulation: SimResult;
  scenario: Scenario;
  challenge: Scenario;
  minimumTransfer: number;
  guess: number;
  answered: boolean;
  correct: boolean;
  round: number;
  totalRounds: number;
  score: number;
  escaped: boolean;
}

export type GameAction =
  | { type: 'SET_INITIAL_CAPITAL'; value: number }
  | { type: 'SET_SAVINGS_RATE'; value: number }
  | { type: 'SET_SUBSISTENCE'; value: number }
  | { type: 'SET_TRANSFER'; value: number }
  | { type: 'SET_GUESS'; value: number }
  | { type: 'START_POLICY' }
  | { type: 'ESCAPE_NOW' }
  | { type: 'CHECK' }
  | { type: 'NEXT_CHALLENGE' }
  | { type: 'RESET' };

const TOLERANCE = 5;
const TOTAL_POLICY_ROUNDS = 5;

export const createInitialState = (): GameState => {
  const initialCapital = 5;
  const savingsRate = 0.2;
  const subsistence = 30;
  return {
    phase: 'simulate',
    initialCapital,
    savingsRate,
    subsistence,
    transfer: 0,
    simulation: simulate(initialCapital, savingsRate, subsistence),
    scenario: buildScenario(initialCapital, savingsRate, subsistence),
    challenge: PRESETS[0],
    minimumTransfer: minimumTransferFor(5, 0.2, 30),
    guess: 0,
    answered: false,
    correct: false,
    round: 1,
    totalRounds: TOTAL_POLICY_ROUNDS,
    score: 0,
    escaped: false,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_INITIAL_CAPITAL': {
      const value = clamp(
        action.value,
        MIN_INITIAL_CAPITAL,
        MAX_INITIAL_CAPITAL
      );
      return {
        ...state,
        initialCapital: value,
        simulation: simulate(value, state.savingsRate, state.subsistence),
        scenario: buildScenario(value, state.savingsRate, state.subsistence),
      };
    }
    case 'SET_SAVINGS_RATE': {
      const value = clamp(action.value, MIN_SAVINGS_RATE, MAX_SAVINGS_RATE);
      return {
        ...state,
        savingsRate: value,
        simulation: simulate(state.initialCapital, value, state.subsistence),
        scenario: buildScenario(state.initialCapital, value, state.subsistence),
      };
    }
    case 'SET_SUBSISTENCE': {
      const value = clamp(action.value, 10, 48);
      return {
        ...state,
        subsistence: value,
        simulation: simulate(state.initialCapital, state.savingsRate, value),
        scenario: buildScenario(state.initialCapital, state.savingsRate, value),
      };
    }
    case 'SET_TRANSFER':
      return {
        ...state,
        transfer: clamp(action.value, MIN_TRANSFER, MAX_TRANSFER),
      };
    case 'SET_GUESS':
      return {
        ...state,
        guess: clamp(action.value, MIN_TRANSFER, MAX_TRANSFER),
      };
    case 'START_POLICY':
      return { ...state, phase: 'policy' };
    case 'ESCAPE_NOW': {
      const result = simulate(
        state.challenge.initialCapital,
        state.challenge.savingsRate,
        state.challenge.subsistence,
        state.transfer
      );
      return { ...state, escaped: result.escaped };
    }
    case 'CHECK': {
      if (state.phase !== 'policy' || state.answered) return state;
      const min = minimumTransferFor(
        state.challenge.initialCapital,
        state.challenge.savingsRate,
        state.challenge.subsistence
      );
      const correct = state.guess >= min && state.guess <= min + TOLERANCE;
      return {
        ...state,
        answered: true,
        correct,
        score: state.score + (correct ? 1 : 0),
        minimumTransfer: min,
      };
    }
    case 'NEXT_CHALLENGE':
      if (state.round >= state.totalRounds || !state.answered) return state;
      return {
        ...state,
        round: state.round + 1,
        challenge: PRESETS[state.round % PRESETS.length],
        minimumTransfer: minimumTransferFor(
          PRESETS[state.round % PRESETS.length].initialCapital,
          PRESETS[state.round % PRESETS.length].savingsRate,
          PRESETS[state.round % PRESETS.length].subsistence
        ),
        guess: 0,
        transfer: 0,
        answered: false,
        correct: false,
        escaped: false,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));
