import { FACTORS, STARTING_CASH, TOTAL_ROUNDS } from './constants';
import type { BubbleAction, GameState } from './types';

export const episodePrice = (round: number, fundamental: number): number =>
  fundamental * FACTORS[round - 1];

export const applyAction = (
  state: GameState,
  action: BubbleAction,
  price: number,
  round: number
): GameState => {
  if (round < 1 || round > TOTAL_ROUNDS) return state;
  switch (action) {
    case 'buy': {
      if (state.cash < price) return state;
      const units = state.units + 1;
      return {
        ...state,
        cash: state.cash - price,
        units,
        avgCost: (state.avgCost * state.units + price) / units,
      };
    }
    case 'sell': {
      if (state.units <= 0) return state;
      return {
        ...state,
        cash: state.cash + state.units * price,
        units: 0,
        avgCost: 0,
        realized: state.realized + state.units * (price - state.avgCost),
      };
    }
    case 'hold':
      return state;
  }
};

export const finalWealth = (state: GameState, finalPrice: number): number =>
  state.cash + state.units * finalPrice;

export const wasAboveFundamentals = (
  price: number,
  fundamental: number
): boolean => price > fundamental;

export const pnlOf = (state: GameState, price: number): number =>
  finalWealth(state, price) - STARTING_CASH;
