import { ITEMS, TOTAL_ROUNDS } from './constants';
import { gap, nextItem } from './game';
import type { Item, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  item: Item;
  wta: number | null;
  wtp: number | null;
  result: RoundResult | null;
  results: RoundResult[];
}

export type GameAction =
  | { type: 'START_ROUND'; rand: number }
  | { type: 'SUBMIT_WTA'; value: number }
  | { type: 'SUBMIT_WTP'; value: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'wta',
  round: 1,
  item: ITEMS[0],
  wta: null,
  wtp: null,
  result: null,
  results: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_ROUND':
      return {
        ...state,
        phase: 'wta',
        item: nextItem(action.rand),
        wta: null,
        wtp: null,
        result: null,
      };
    case 'SUBMIT_WTA':
      if (state.phase !== 'wta') return state;
      return { ...state, phase: 'wtp', wta: action.value };
    case 'SUBMIT_WTP': {
      if (state.phase !== 'wtp') return state;
      const wta = state.wta ?? 0;
      const result: RoundResult = {
        round: state.round,
        item: state.item,
        wta,
        wtp: action.value,
        gap: gap(wta, action.value),
      };
      return { ...state, phase: 'reveal', wtp: action.value, result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const updated = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results: updated };
      }
      return {
        ...state,
        phase: 'wta',
        round: state.round + 1,
        results: updated,
        result: null,
        wta: null,
        wtp: null,
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
