import { GAMES } from './constants';
import { buildReview, findNash, gameById, randomGame } from './game';
import type { Cell, Game, GameId, Phase, Review } from './types';

export interface GameState {
  phase: Phase;
  gameId: GameId | null;
  game: Game | null;
  rowIdx: number | null;
  colIdx: number | null;
  review: Review | null;
  quizCell: Cell | null;
  quizAttempts: number;
  quizCorrect: number;
}

export type GameAction =
  | { type: 'SELECT_GAME'; gameId: GameId }
  | { type: 'CHOOSE_ROW'; index: number }
  | { type: 'CHOOSE_COL'; index: number }
  | { type: 'START_QUIZ' }
  | { type: 'QUIZ_CLICK'; cell: Cell }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'setup',
  gameId: null,
  game: null,
  rowIdx: null,
  colIdx: null,
  review: null,
  quizCell: null,
  quizAttempts: 0,
  quizCorrect: 0,
});

const isValidIndex = (index: number): boolean => index === 0 || index === 1;

const selectGame = (state: GameState, gameId: GameId): GameState => {
  const game = gameId === 'challenge' ? randomGame() : gameById(gameId);
  if (!game) return state;
  return {
    ...state,
    phase: 'explore',
    gameId,
    game,
    rowIdx: null,
    colIdx: null,
    review: null,
    quizCell: null,
  };
};

const withReview = (state: GameState): GameState => {
  const { game, rowIdx, colIdx } = state;
  if (!game || rowIdx === null || colIdx === null) return state;
  return {
    ...state,
    phase: 'review',
    review: buildReview(game, rowIdx, colIdx),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_GAME':
      return selectGame(state, action.gameId);
    case 'CHOOSE_ROW':
      if (!isValidIndex(action.index)) return state;
      if (state.phase !== 'explore' && state.phase !== 'review') return state;
      return withReview({ ...state, rowIdx: action.index });
    case 'CHOOSE_COL':
      if (!isValidIndex(action.index)) return state;
      if (state.phase !== 'explore' && state.phase !== 'review') return state;
      return withReview({ ...state, colIdx: action.index });
    case 'START_QUIZ': {
      if (!state.game || state.phase === 'setup') return state;
      return { ...state, phase: 'quiz', quizCell: null };
    }
    case 'QUIZ_CLICK': {
      const { game } = state;
      if (!game || state.phase !== 'quiz') return state;
      const nash = findNash(game);
      const isNash =
        nash.length === 0 ||
        nash.some(
          (c) => c.row === action.cell.row && c.col === action.cell.col
        );
      return {
        ...state,
        quizCell: action.cell,
        quizAttempts: state.quizAttempts + 1,
        quizCorrect: isNash ? state.quizCorrect + 1 : state.quizCorrect,
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
