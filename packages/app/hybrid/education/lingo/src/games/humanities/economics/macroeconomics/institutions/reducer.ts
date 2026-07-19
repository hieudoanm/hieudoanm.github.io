import { PRESETS, TARGETS, TOTAL_ROUNDS } from './constants';
import { isTargetHit, runSimulation } from './game';
import type { GameAction, GameState, Institutions } from './types';

export const INITIAL_INSTITUTIONS: Institutions = {
  propertyRights: 40,
  contracts: 40,
  stability: 40,
};

const TOLERANCE = 10;

export const createInitialState = (): GameState => ({
  phase: 'configure',
  round: 1,
  preset: null,
  institutions: { ...INITIAL_INSTITUTIONS },
  targetGrowth: TARGETS[0],
  initialGdp: 1000,
  result: null,
  success: false,
  roundsWon: 0,
});

const advanceRound = (state: GameState): GameState => {
  if (state.round >= TOTAL_ROUNDS) return { ...state, phase: 'result' };
  return {
    ...state,
    phase: 'configure',
    round: state.round + 1,
    targetGrowth: TARGETS[state.round],
    result: null,
    success: false,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_PRESET':
      if (state.phase !== 'configure') return state;
      return {
        ...state,
        preset: action.preset,
        institutions: { ...PRESETS[action.preset].institutions },
      };
    case 'SET_INSTITUTION':
      if (state.phase !== 'configure') return state;
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.which]: action.value,
        },
      };
    case 'SIMULATE': {
      if (state.phase !== 'configure' || !state.preset) return state;
      const result = runSimulation(
        state.institutions,
        state.initialGdp,
        state.initialGdp
      );
      const hit = isTargetHit(result.growthPct, state.targetGrowth, TOLERANCE);
      return {
        ...state,
        phase: 'result',
        result,
        success: hit,
        roundsWon: state.roundsWon + (hit ? 1 : 0),
      };
    }
    case 'NEXT_ROUND':
      if (state.phase !== 'result') return state;
      return advanceRound(state);
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
