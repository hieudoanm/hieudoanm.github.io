import { compound, consumptionUtility, tempted } from './game';
import { DAILY_INCOME, TOTAL_DAYS } from './constants';
import type { DayResult, Phase } from './types';

export interface GameState {
  phase: Phase;
  day: number;
  commitment: boolean;
  savingsBalance: number;
  totalConsumptionUtility: number;
  totalSplurgeLoss: number;
  results: DayResult[];
  lastResult: DayResult | null;
}

export type GameAction =
  | { type: 'START_GAME'; commitment: boolean }
  | { type: 'SAVE'; intendedSave: number; random01: number }
  | { type: 'NEXT_DAY' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'setup',
  day: 1,
  commitment: false,
  savingsBalance: 0,
  totalConsumptionUtility: 0,
  totalSplurgeLoss: 0,
  results: [],
  lastResult: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        phase: 'choose',
        commitment: action.commitment,
        day: 1,
        savingsBalance: 0,
        totalConsumptionUtility: 0,
        totalSplurgeLoss: 0,
        results: [],
        lastResult: null,
      };
    case 'SAVE': {
      if (state.phase !== 'choose') return state;
      const actualSave = tempted(
        action.random01,
        action.intendedSave,
        state.commitment
      );
      const newBalance = compound(state.savingsBalance, actualSave);
      const consume = DAILY_INCOME - actualSave;
      const dayU = consumptionUtility(consume);
      const splurgeLoss = state.commitment
        ? 0
        : actualSave < action.intendedSave
          ? action.intendedSave - actualSave
          : 0;
      const result: DayResult = {
        day: state.day,
        intendedSave: action.intendedSave,
        actualSave,
        newBalance,
        consume,
        consumptionUtility: dayU,
        splurgeLoss,
      };
      return {
        ...state,
        phase: 'reveal',
        lastResult: result,
        savingsBalance: newBalance,
        totalConsumptionUtility:
          Math.round((state.totalConsumptionUtility + dayU) * 100) / 100,
        totalSplurgeLoss: state.totalSplurgeLoss + splurgeLoss,
      };
    }
    case 'NEXT_DAY':
      if (!state.lastResult) return state;
      if (state.day >= TOTAL_DAYS) {
        return {
          ...state,
          phase: 'done',
          results: [...state.results, state.lastResult],
        };
      }
      return {
        ...state,
        phase: 'choose',
        day: state.day + 1,
        results: [...state.results, state.lastResult],
        lastResult: null,
      };
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
