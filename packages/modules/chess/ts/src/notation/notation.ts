import type {
  Board,
  Color,
  CastlingRights,
  Square,
  Move,
  PieceType,
  GameState,
} from '../types/types';
import { fromFenBoard, toFenBoard } from '../board/board';
import { getLegalMoves, getPseudoLegalMoves } from '../moves/moves';
import { isInCheck } from '../moves/attack';
import {
  getRank,
  getFile,
  toSquare,
  toSquareName,
  toSquareFromName,
} from '../utils/utils';

export const fromFen = (fen: string): GameState => {
  const parts = fen.split(' ') as [
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  const board = fromFenBoard(parts[0]!);

  const turn: Color = parts[1] === 'b' ? 'b' : 'w';

  const castlingRights: CastlingRights = {
    K: false,
    Q: false,
    k: false,
    q: false,
  };
  if (parts[2] !== '-') {
    for (const ch of parts[2]!) {
      if (ch === 'K') castlingRights.K = true;
      else if (ch === 'Q') castlingRights.Q = true;
      else if (ch === 'k') castlingRights.k = true;
      else if (ch === 'q') castlingRights.q = true;
    }
  }

  const enPassant = parts[3] === '-' ? null : toSquareFromName(parts[3]!);

  const halfMoveClock = parseInt(parts[4]!) || 0;
  const fullMoveNumber = parseInt(parts[5]!) || 1;

  return {
    board,
    turn,
    castlingRights,
    enPassant,
    halfMoveClock,
    fullMoveNumber,
    history: [],
    status: 'playing',
    result: '*',
    inCheck: isInCheck(board, turn),
  };
};

export const toFen = (state: GameState): string => {
  const fen = toFenBoard(state.board);

  const cr = state.castlingRights;
  let castling = '';
  if (cr.K) castling += 'K';
  if (cr.Q) castling += 'Q';
  if (cr.k) castling += 'k';
  if (cr.q) castling += 'q';

  return `${fen} ${state.turn} ${castling || '-'} ${state.enPassant !== null ? toSquareName(state.enPassant) : '-'} ${state.halfMoveClock} ${state.fullMoveNumber}`;
};

const PIECE_LETTER: Record<PieceType, string> = {
  p: '',
  n: 'N',
  b: 'B',
  r: 'R',
  q: 'Q',
  k: 'K',
};

export const toUci = (move: Move): string =>
  toSquareName(move.from) + toSquareName(move.to) + (move.promotion ?? '');

export const fromUci = (uci: string): Move | null => {
  if (uci.length < 4) return null;
  const from = toSquareFromName(uci.slice(0, 2));
  const to = toSquareFromName(uci.slice(2, 4));
  if (from === null || to === null) return null;
  const promoChar = uci[4] as PieceType | undefined;
  const promotion =
    promoChar && ['q', 'r', 'b', 'n'].includes(promoChar) ? promoChar : null;
  return { from, to, promotion, captured: null };
};

export const toSan = (
  board: Board,
  move: Move,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): string => {
  const piece = board[move.from]!;
  const fileDiff = Math.abs(getFile(move.to) - getFile(move.from));

  if (piece.type === 'k' && fileDiff === 2) {
    return getFile(move.to) > getFile(move.from) ? 'O-O' : 'O-O-O';
  }

  if (piece.type === 'p') {
    const capture = fileDiff !== 0 || move.captured;
    const promo = move.promotion ? `=${move.promotion!.toUpperCase()}` : '';
    const file = capture ? toSquareName(move.from)[0]! : '';
    const capInd = capture ? 'x' : '';
    return `${file}${capInd}${toSquareName(move.to)}${promo}`;
  }

  const letter = PIECE_LETTER[piece.type];

  const others = getPseudoLegalMoves(
    board,
    turn,
    castlingRights,
    enPassant
  ).filter((m) => {
    const p = board[m.from];
    return (
      p &&
      p.type === piece.type &&
      m.to === move.to &&
      m.from !== move.from &&
      getLegalMoves(board, turn, castlingRights, enPassant).some(
        (lm) => lm.from === m.from && lm.to === m.to
      )
    );
  });

  let disambig = '';
  if (others.length > 0) {
    const sameFile = others.some((m) => getFile(m.from) === getFile(move.from));
    const sameRank = others.some((m) => getRank(m.from) === getRank(move.from));
    if (sameFile) disambig = toSquareName(move.from);
    else if (sameRank) disambig = toSquareName(move.from)[0]!;
    else disambig = toSquareName(move.from)[0]!;
  }

  const capture = move.captured ? 'x' : '';
  return `${letter}${disambig}${capture}${toSquareName(move.to)}`;
};

export const fromSan = (
  san: string,
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): Move | null => {
  const moves = getLegalMoves(board, turn, castlingRights, enPassant);

  if (san === 'O-O' || san === 'O-O-O') {
    const rank = turn === 'w' ? 0 : 7;
    const kingFile = san === 'O-O' ? 6 : 2;
    return (
      moves.find((m) => {
        const p = board[m.from];
        return p?.type === 'k' && m.to === toSquare(rank, kingFile);
      }) ?? null
    );
  }

  const cleaned = san.replace(/[+#]/g, '');
  const hasCapture = cleaned.includes('x');
  const hasPromo = cleaned.includes('=');

  let pieceType: PieceType = 'p';
  let targetSq: Square | null = null;
  let disambigFile: number | null = null;
  let disambigRank: number | null = null;
  let promotionType: PieceType | undefined;

  const parts = hasPromo ? cleaned.split('=') : [cleaned];
  const mainPart = parts[0]!;

  if (hasPromo && parts[1]) {
    promotionType = parts[1]!.toLowerCase() as PieceType;
  }

  if (mainPart[0]! >= 'A' && mainPart[0]! <= 'Z') {
    const pieceMap: Record<string, PieceType> = {
      K: 'k',
      Q: 'q',
      R: 'r',
      B: 'b',
      N: 'n',
    };
    pieceType = pieceMap[mainPart[0]!] ?? 'p';
  }

  const withoutPiece = pieceType !== 'p' ? mainPart.slice(1) : mainPart;
  const moveStr = withoutPiece.replace('x', '');

  if (moveStr.length >= 2) {
    const destStr = moveStr.slice(-2);
    targetSq = toSquareFromName(destStr);

    if (moveStr.length > 2) {
      const disambigStr = moveStr.slice(0, -2);
      if (disambigStr.length === 1) {
        const f = 'abcdefgh'.indexOf(disambigStr[0]!);
        if (f >= 0) disambigFile = f;
        else disambigRank = parseInt(disambigStr[0]!) - 1;
      } else if (disambigStr.length >= 2) {
        const sq = toSquareFromName(disambigStr);
        if (sq !== null) {
          disambigFile = getFile(sq);
          disambigRank = getRank(sq);
        }
      }
    }
  }

  if (targetSq === null) return null;

  return (
    moves.find((m) => {
      const p = board[m.from];
      if (!p || p.type !== pieceType || m.to !== targetSq) return false;
      if (promotionType && m.promotion !== promotionType) return false;
      if (hasCapture && !m.captured) return false;
      if (disambigFile !== null && getFile(m.from) !== disambigFile)
        return false;
      if (disambigRank !== null && getRank(m.from) !== disambigRank)
        return false;
      return true;
    }) ?? null
  );
};
