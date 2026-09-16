import { FUNDAMENTALS, STARTING_CASH, TOTAL_ROUNDS } from './constants';
import { applyAction, episodePrice, finalWealth } from './game';
import type { GameAction, GameState } from './types';

export const createInitialState = (): GameState => ({
  phase: 'play',
  episode: 1,
  round: 1,
  fundamental: FUNDAMENTALS[0],
  cash: STARTING_CASH,
  units: 0,
  avgCost: 0,
  realized: 0,
  lastAction: null,
  episodeScores: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_ACTION': {
      if (state.phase !== 'play') return state;
      const price = episodePrice(state.round, state.fundamental);
      return {
        ...applyAction(state, action.action, price, state.round),
        phase: 'outcome',
        lastAction: action.action,
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'outcome') return state;
      if (state.round >= TOTAL_ROUNDS) {
        const score = finalWealth(
          state,
          episodePrice(TOTAL_ROUNDS, state.fundamental)
        );
        const episodeScores = [...state.episodeScores, score];
        if (state.episode >= FUNDAMENTALS.length) {
          return { ...state, episodeScores, phase: 'done' };
        }
        return { ...state, episodeScores, phase: 'episode' };
      }
      return {
        ...state,
        phase: 'play',
        round: state.round + 1,
        lastAction: null,
      };
    }
    case 'NEXT_EPISODE': {
      if (state.phase !== 'episode') return state;
      return {
        ...createInitialState(),
        episode: state.episode + 1,
        fundamental: FUNDAMENTALS[state.episode],
        episodeScores: state.episodeScores,
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
