import { bestResponses, getPayoffs, isNashEquilibrium } from './game';
import { TOTAL_PLAYS } from './constants';
import type {
  Col,
  GameModule,
  PayoffMatrix,
  Phase,
  PlayResult,
  Row,
} from './types';
import { GAMES } from './constants';

export interface GameState {
  phase: Phase;
  round: number;
  game: GameModule | null;
  matrix: PayoffMatrix | null;
  selectedRow: Row | null;
  aiCol: Col | null;
  lastResult: PlayResult | null;
  plays: PlayResult[];
  neCount: number;
}

export type GameAction =
  | { type: 'START_GAME'; game: GameModule }
  | { type: 'PLAY_ROW'; row: Row }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  game: null,
  matrix: null,
  selectedRow: null,
  aiCol: null,
  lastResult: null,
  plays: [],
  neCount: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_GAME': {
      const matrix = GAMES[action.game];
      if (!matrix) return state;
      return {
        ...state,
        phase: 'pick-row',
        game: action.game,
        matrix,
        selectedRow: null,
        aiCol: null,
        lastResult: null,
      };
    }
    case 'PLAY_ROW': {
      if (!state.matrix || !state.game || state.phase !== 'pick-row')
        return state;
      const row = action.row;
      const brs = bestResponses(state.matrix, row);
      const aiCol: Col = brs[0];
      const [playerPayoff, aiPayoff] = getPayoffs(state.matrix, row, aiCol);
      const isNE = isNashEquilibrium(state.matrix, row, aiCol);
      const result: PlayResult = {
        game: state.game,
        row,
        col: aiCol,
        playerPayoff,
        aiPayoff,
        isNE,
      };
      return {
        ...state,
        phase: 'verdict',
        selectedRow: row,
        aiCol,
        lastResult: result,
        plays: [...state.plays, result],
        neCount: state.neCount + (isNE ? 1 : 0),
      };
    }
    case 'NEXT': {
      if (state.phase !== 'verdict') return state;
      if (state.round >= TOTAL_PLAYS) {
        return { ...state, phase: 'summary', round: state.round + 1 };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        game: null,
        matrix: null,
        selectedRow: null,
        aiCol: null,
        lastResult: null,
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
