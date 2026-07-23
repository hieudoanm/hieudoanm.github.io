import { createGame, toInitialFen, chess960 } from '@chess/ts';
import { INITIAL_FEN, INITIAL_ID } from '../constants';
import type { BoardMode, SidePanel } from '../types';

export interface BoardState {
  fen: string;
  boardMode: BoardMode;
  thinking: boolean;
  positionId: number;
  panel: SidePanel;
  pgn: string;
  gifLoading: boolean;
}

export type BoardAction =
  | { type: 'SET_FEN'; fen: string }
  | { type: 'SET_BOARD_MODE'; boardMode: BoardMode }
  | { type: 'SET_THINKING'; thinking: boolean }
  | { type: 'SET_POSITION_ID'; positionId: number }
  | { type: 'SET_PANEL'; panel: SidePanel }
  | { type: 'SET_PGN'; pgn: string }
  | { type: 'SET_GIF_LOADING'; gifLoading: boolean }
  | { type: 'SYNC_GAME'; fen: string; pgn: string };

export const initialState: BoardState = {
  fen: INITIAL_FEN,
  boardMode: 'explore',
  thinking: false,
  positionId: INITIAL_ID,
  panel: 'position',
  pgn: '',
  gifLoading: false,
};

export const boardReducer = (
  state: BoardState,
  action: BoardAction
): BoardState => {
  switch (action.type) {
    case 'SET_FEN':
      return { ...state, fen: action.fen };
    case 'SET_BOARD_MODE':
      return { ...state, boardMode: action.boardMode };
    case 'SET_THINKING':
      return { ...state, thinking: action.thinking };
    case 'SET_POSITION_ID':
      return { ...state, positionId: action.positionId };
    case 'SET_PANEL':
      return { ...state, panel: action.panel };
    case 'SET_PGN':
      return { ...state, pgn: action.pgn };
    case 'SET_GIF_LOADING':
      return { ...state, gifLoading: action.gifLoading };
    case 'SYNC_GAME':
      return { ...state, fen: action.fen, pgn: action.pgn, thinking: false };
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const build960 = (id: number) => {
  const pos = chess960[id] ?? '';
  return createGame(toInitialFen(pos));
};
