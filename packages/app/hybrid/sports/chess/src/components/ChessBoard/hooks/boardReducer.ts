import { chess960, createGame, toInitialFen } from '@chess/ts';
import { INITIAL_FEN, INITIAL_ID } from '../constants';
import type { PieceSetKey } from '../pieceSets';
import type {
  BoardMode,
  BoardTheme,
  MoveRecord,
  Odds,
  Side,
  SidePanel,
} from '../types';
import { setSquareFen } from '../utils/fen';

export interface BoardState {
  fen: string;
  startFen: string;
  boardMode: BoardMode;
  thinking: boolean;
  positionId: number;
  panel: SidePanel;
  pgn: string;
  gifLoading: boolean;
  flipped: boolean;
  selectedSquare: string | null;
  legalTargets: string[];
  moves: MoveRecord[];
  cursor: number;
  depth: number;
  theme: BoardTheme;
  pieceSet: PieceSetKey;
  showNotation: boolean;
  side: Side;
  odds: Odds;
  setupMode: boolean;
  setupFen: string;
  setupPalette: string | null;
}

export type BoardAction =
  | { type: 'SET_FEN'; fen: string }
  | { type: 'SET_BOARD_MODE'; boardMode: BoardMode }
  | { type: 'SET_THINKING'; thinking: boolean }
  | { type: 'SET_POSITION_ID'; positionId: number }
  | { type: 'SET_PANEL'; panel: SidePanel }
  | { type: 'SET_PGN'; pgn: string }
  | { type: 'SET_GIF_LOADING'; gifLoading: boolean }
  | { type: 'SYNC_GAME'; fen: string; pgn: string }
  | { type: 'LOAD_GAME'; fen: string; pgn: string; moves: MoveRecord[] }
  | { type: 'SET_FLIPPED'; flipped: boolean }
  | { type: 'SET_SELECTED'; square: string; targets: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'ADD_MOVE'; move: MoveRecord }
  | { type: 'JUMP_TO'; cursor: number }
  | { type: 'SET_DEPTH'; depth: number }
  | { type: 'SET_THEME'; theme: BoardTheme }
  | { type: 'SET_PIECE_SET'; pieceSet: PieceSetKey }
  | { type: 'SET_NOTATION'; showNotation: boolean }
  | { type: 'SET_SIDE'; side: Side }
  | { type: 'SET_ODDS'; odds: Odds }
  | { type: 'SET_SETUP_MODE'; setupMode: boolean }
  | { type: 'SET_SETUP_FEN'; fen: string }
  | { type: 'SET_SETUP_PALETTE'; palette: string | null }
  | { type: 'SET_SETUP_SQUARE'; square: string; piece: string | null };

export const initialState: BoardState = {
  fen: INITIAL_FEN,
  startFen: INITIAL_FEN,
  boardMode: 'explore',
  thinking: false,
  positionId: INITIAL_ID,
  panel: 'position',
  pgn: '',
  gifLoading: false,
  flipped: false,
  selectedSquare: null,
  legalTargets: [],
  moves: [],
  cursor: -1,
  depth: 15,
  theme: 'dark',
  pieceSet: 'standard',
  showNotation: true,
  side: 'white',
  odds: 'none',
  setupMode: false,
  setupFen: INITIAL_FEN,
  setupPalette: null,
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
      return {
        ...state,
        fen: action.fen,
        startFen: action.fen,
        pgn: action.pgn,
        thinking: false,
        moves: [],
        cursor: -1,
        selectedSquare: null,
        legalTargets: [],
      };
    case 'LOAD_GAME':
      return {
        ...state,
        fen: action.fen,
        startFen: action.fen,
        pgn: action.pgn,
        thinking: false,
        moves: action.moves,
        cursor: action.moves.length - 1,
        selectedSquare: null,
        legalTargets: [],
      };
    case 'SET_FLIPPED':
      return { ...state, flipped: action.flipped };
    case 'SET_SELECTED':
      return {
        ...state,
        selectedSquare: action.square,
        legalTargets: action.targets,
      };
    case 'CLEAR_SELECTION':
      return { ...state, selectedSquare: null, legalTargets: [] };
    case 'ADD_MOVE': {
      const branch = state.moves.slice(0, state.cursor + 1);
      return {
        ...state,
        moves: [...branch, action.move],
        cursor: branch.length,
        fen: action.move.fen,
        selectedSquare: null,
        legalTargets: [],
      };
    }
    case 'JUMP_TO': {
      const cursor = Math.max(
        -1,
        Math.min(state.moves.length - 1, action.cursor)
      );
      const record = cursor === -1 ? undefined : state.moves[cursor];
      return {
        ...state,
        cursor,
        fen: record?.fen ?? state.startFen,
        selectedSquare: null,
        legalTargets: [],
      };
    }
    case 'SET_DEPTH':
      return { ...state, depth: action.depth };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_PIECE_SET':
      return { ...state, pieceSet: action.pieceSet };
    case 'SET_NOTATION':
      return { ...state, showNotation: action.showNotation };
    case 'SET_SIDE':
      return { ...state, side: action.side };
    case 'SET_ODDS':
      return { ...state, odds: action.odds };
    case 'SET_SETUP_MODE':
      return {
        ...state,
        setupMode: action.setupMode,
        setupFen: action.setupMode ? state.fen : state.setupFen,
      };
    case 'SET_SETUP_FEN':
      return { ...state, setupFen: action.fen };
    case 'SET_SETUP_PALETTE':
      return { ...state, setupPalette: action.palette };
    case 'SET_SETUP_SQUARE':
      return {
        ...state,
        setupFen: setSquareFen(state.setupFen, action.square, action.piece),
      };
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const build960 = (id: number) => {
  const pos = chess960[id] ?? '';
  return createGame(toInitialFen(pos));
};
