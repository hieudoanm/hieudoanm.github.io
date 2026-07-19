import type {
  Board,
  CastlingRights,
  Color,
  Square,
  Move,
} from '../types/types';
import { fromFen } from '../notation/notation';
import { getLegalMoves, applyMove } from '../moves/moves';
import { cloneBoard } from '../board/board';
import { toSquareFromName, toSquareName } from '../utils/utils';
import { updateCastlingRights } from '../game/game';
import { findBestMove } from './search';

export type UCICommand =
  'uci' | 'isready' | 'stop' | 'quit' | PositionCommand | GoCommand;

export interface PositionCommand {
  type: 'position';
  fen?: string;
  moves: string[];
}

export interface GoCommand {
  type: 'go';
  depth?: number;
  movetime?: number;
  wtime?: number;
  btime?: number;
  movestogo?: number;
}

export type UCIResponse =
  | { type: 'info'; message: string }
  | { type: 'bestmove'; move: string | null }
  | { type: 'readyok' }
  | { type: 'uciok' };

export const parseUciCommand = (line: string): UCICommand | null => {
  const trimmed = line.trim();
  if (!trimmed) return null;

  if (trimmed === 'uci') return 'uci';
  if (trimmed === 'isready') return 'isready';
  if (trimmed === 'stop') return 'stop';
  if (trimmed === 'quit') return 'quit';

  if (trimmed.startsWith('position')) {
    const rest = trimmed.slice(8).trim();
    let fen: string | undefined;
    let movesPart: string;

    if (rest.startsWith('startpos')) {
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      movesPart = rest.slice(8).trim();
      if (movesPart.startsWith('moves ')) movesPart = movesPart.slice(6).trim();
    } else if (rest.startsWith('fen ')) {
      const movesIdx = rest.indexOf(' moves ');
      if (movesIdx === -1) {
        fen = rest.slice(4).trim();
        movesPart = '';
      } else {
        fen = rest.slice(4, movesIdx).trim();
        movesPart = rest.slice(movesIdx + 7).trim();
      }
    } else {
      return null;
    }

    const moves = movesPart ? movesPart.split(/\s+/) : [];
    return { type: 'position' as const, fen, moves };
  }

  if (trimmed.startsWith('go')) {
    const params: Record<string, number | undefined> = {};
    const tokens = trimmed.slice(2).trim().split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i]!;
      const val = tokens[i + 1];
      if (tok === 'depth' && val) {
        params.depth = parseInt(val, 10);
        i++;
      } else if (tok === 'movetime' && val) {
        params.movetime = parseInt(val, 10);
        i++;
      } else if (tok === 'wtime' && val) {
        params.wtime = parseInt(val, 10);
        i++;
      } else if (tok === 'btime' && val) {
        params.btime = parseInt(val, 10);
        i++;
      } else if (tok === 'movestogo' && val) {
        params.movestogo = parseInt(val, 10);
        i++;
      }
    }
    return { type: 'go' as const, ...params };
  }

  return null;
};

const moveToUci = (move: Move): string =>
  toSquareName(move.from) + toSquareName(move.to) + (move.promotion ?? '');

export type UCIEngineConfig = {
  onResponse?: (response: UCIResponse) => void;
};

export class UCIEngine {
  private board: Board;
  private turn: Color;
  private castlingRights: CastlingRights;
  private enPassant: Square | null;
  private onResponse: ((response: UCIResponse) => void) | undefined;
  private searchScheduled: boolean = false;

  constructor(config: UCIEngineConfig = {}) {
    const initial = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    this.board = initial.board;
    this.turn = initial.turn;
    this.castlingRights = initial.castlingRights;
    this.enPassant = initial.enPassant;
    this.onResponse = config.onResponse;
  }

  handle(command: UCICommand): void {
    if (command === 'uci') {
      this.respond({ type: 'uciok' });
      return;
    }

    if (command === 'isready') {
      this.respond({ type: 'readyok' });
      return;
    }

    if (command === 'stop' || command === 'quit') {
      this.searchScheduled = false;
      return;
    }

    if (typeof command === 'object') {
      if (command.type === 'position') {
        this.handlePosition(command);
        return;
      }

      if (command.type === 'go') {
        this.handleGo(command);
        return;
      }
    }
  }

  private respond(response: UCIResponse): void {
    if (this.onResponse) {
      this.onResponse(response);
    }
  }

  private handlePosition(cmd: PositionCommand): void {
    const state = fromFen(cmd.fen!);
    this.board = state.board;
    this.turn = state.turn;
    this.castlingRights = state.castlingRights;
    this.enPassant = state.enPassant;

    for (const uciMove of cmd.moves) {
      const from = toSquareFromName(uciMove.slice(0, 2));
      const to = toSquareFromName(uciMove.slice(2, 4));
      if (from === null || to === null) break;

      const promo =
        uciMove.length >= 5
          ? (uciMove[4] as 'q' | 'r' | 'b' | 'n' | null)
          : null;

      const legal = getLegalMoves(
        this.board,
        this.turn,
        this.castlingRights,
        this.enPassant
      );
      const move = legal.find(
        (m) =>
          m.from === from &&
          m.to === to &&
          (promo ? m.promotion === promo : !m.promotion)
      );
      if (!move) break;

      const newBoard = cloneBoard(this.board);
      applyMove(newBoard, move);

      this.board = newBoard;
      this.castlingRights = updateCastlingRights(
        this.castlingRights,
        move,
        this.board
      );
      this.enPassant = computeEnPassant(this.board, move);
      this.turn = this.turn === 'w' ? 'b' : 'w';
    }
  }

  private handleGo(cmd: GoCommand): void {
    this.searchScheduled = false;

    const timeMs =
      cmd.movetime ??
      (this.turn === 'w'
        ? cmd.wtime
          ? Math.floor(cmd.wtime / 40)
          : undefined
        : cmd.btime
          ? Math.floor(cmd.btime / 40)
          : undefined);

    Promise.resolve().then(() => {
      if (this.searchScheduled) return;
      this.searchScheduled = true;

      const opts: { depth?: number; timeMs?: number } = {};
      if (cmd.depth !== undefined) opts.depth = cmd.depth;
      if (timeMs !== undefined) opts.timeMs = timeMs;
      const result = findBestMove(
        this.board,
        this.turn,
        this.castlingRights,
        this.enPassant,
        opts
      );

      this.respond({
        type: 'bestmove',
        move: result.move ? moveToUci(result.move) : null,
      });
      this.searchScheduled = false;
    });
  }
}

const computeEnPassant = (board: Board, move: Move): Square | null => {
  const piece = board[move.to] ?? board[move.from];
  if (
    piece &&
    piece.type === 'p' &&
    Math.abs(Math.floor(move.to / 8) - Math.floor(move.from / 8)) === 2
  ) {
    return Math.floor((move.from + move.to) / 2) as Square;
  }
  return null;
};
