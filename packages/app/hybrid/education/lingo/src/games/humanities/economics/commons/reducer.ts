import { BOTS, MAX_HARVEST, START_STOCK, TOTAL_ROUNDS } from './constants';
import { growthFor, harvest, hasCollapsed, nextStock } from './game';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  stock: number;
  playerHarvest: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalHarvested: number;
  collapsed: boolean;
}

export type GameAction =
  | { type: 'SUBMIT_HARVEST'; amount: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  stock: START_STOCK,
  playerHarvest: null,
  result: null,
  results: [],
  totalHarvested: 0,
  collapsed: false,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_HARVEST': {
      if (state.phase !== 'choose') return state;
      const requested = Math.min(
        Math.max(0, Math.round(action.amount)),
        MAX_HARVEST
      );
      const botHarvests: Record<string, number> = {};
      let remaining = state.stock;
      const playerTaken = harvest(requested, remaining);
      remaining -= playerTaken;
      let botTotal = 0;
      for (const bot of BOTS) {
        const taken = harvest(bot.harvest, remaining);
        botHarvests[bot.id] = taken;
        remaining -= taken;
        botTotal += taken;
      }
      const totalHarvest = playerTaken + botTotal;
      const growth = growthFor(state.stock);
      const newStock = nextStock(state.stock, totalHarvest);
      const collapsed = hasCollapsed(newStock);
      const result: RoundResult = {
        round: state.round,
        playerHarvest: playerTaken,
        botHarvests,
        totalHarvest,
        stockBefore: state.stock,
        stockAfter: newStock,
        growth,
        collapsed,
      };
      return {
        ...state,
        phase: 'reveal',
        playerHarvest: playerTaken,
        result,
        collapsed,
        totalHarvested: state.totalHarvested + playerTaken,
      };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      if (state.collapsed || state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results: [...state.results, state.result],
          stock: state.result.stockAfter,
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        stock: state.result.stockAfter,
        results: [...state.results, state.result],
        result: null,
        playerHarvest: null,
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
