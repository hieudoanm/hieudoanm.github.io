import type {
  Board,
  Color,
  CastlingRights,
  Square,
  Move,
  PieceType,
  GameState,
} from './types';
import { boardFromFen, boardToFen } from './board';
import { legalMoves, generatePseudoLegalMoves } from './moves';
import { isInCheck } from './attack';
import { rankOf, fileOf, square, squareName, parseSquare } from './utils';

export const parseFEN = (fen: string): GameState => {
  const parts = fen.split(' ') as [
    string,
    string,
    string,
    string,
    string,
    string,
  ];

  const board = boardFromFen(parts[0]!);

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

  const enPassant = parts[3] === '-' ? null : parseSquare(parts[3]!);

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

export const stringifyFEN = (state: GameState): string => {
  const fen = boardToFen(state.board);

  const cr = state.castlingRights;
  let castling = '';
  if (cr.K) castling += 'K';
  if (cr.Q) castling += 'Q';
  if (cr.k) castling += 'k';
  if (cr.q) castling += 'q';

  return `${fen} ${state.turn} ${castling || '-'} ${state.enPassant !== null ? squareName(state.enPassant) : '-'} ${state.halfMoveClock} ${state.fullMoveNumber}`;
};

const PIECE_LETTER: Record<PieceType, string> = {
  p: '',
  n: 'N',
  b: 'B',
  r: 'R',
  q: 'Q',
  k: 'K',
};

export const moveToUCI = (move: Move): string =>
  squareName(move.from) + squareName(move.to) + (move.promotion ?? '');

export const parseUCI = (uci: string): Move | null => {
  if (uci.length < 4) return null;
  const from = parseSquare(uci.slice(0, 2));
  const to = parseSquare(uci.slice(2, 4));
  if (from === null || to === null) return null;
  const promoChar = uci[4] as PieceType | undefined;
  const promotion =
    promoChar && ['q', 'r', 'b', 'n'].includes(promoChar) ? promoChar : null;
  return { from, to, promotion, captured: null };
};

export const moveToSAN = (
  board: Board,
  move: Move,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): string => {
  const piece = board[move.from]!;
  const fileDiff = Math.abs(fileOf(move.to) - fileOf(move.from));

  if (piece.type === 'k' && fileDiff === 2) {
    return fileOf(move.to) > fileOf(move.from) ? 'O-O' : 'O-O-O';
  }

  if (piece.type === 'p') {
    const capture = fileDiff !== 0 || move.captured;
    const promo = move.promotion ? `=${move.promotion!.toUpperCase()}` : '';
    const file = capture ? squareName(move.from)[0]! : '';
    const capInd = capture ? 'x' : '';
    return `${file}${capInd}${squareName(move.to)}${promo}`;
  }

  const letter = PIECE_LETTER[piece.type];

  const others = generatePseudoLegalMoves(
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
      legalMoves(board, turn, castlingRights, enPassant).some(
        (lm) => lm.from === m.from && lm.to === m.to
      )
    );
  });

  let disambig = '';
  if (others.length > 0) {
    const sameFile = others.some((m) => fileOf(m.from) === fileOf(move.from));
    const sameRank = others.some((m) => rankOf(m.from) === rankOf(move.from));
    if (sameFile) disambig = squareName(move.from);
    else if (sameRank) disambig = squareName(move.from)[0]!;
    else disambig = squareName(move.from)[0]!;
  }

  const capture = move.captured ? 'x' : '';
  return `${letter}${disambig}${capture}${squareName(move.to)}`;
};

export const parseSAN = (
  san: string,
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): Move | null => {
  const moves = legalMoves(board, turn, castlingRights, enPassant);

  if (san === 'O-O' || san === 'O-O-O') {
    const rank = turn === 'w' ? 0 : 7;
    const kingFile = san === 'O-O' ? 6 : 2;
    return (
      moves.find((m) => {
        const p = board[m.from];
        return p?.type === 'k' && m.to === square(rank, kingFile);
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
    targetSq = parseSquare(destStr);

    if (moveStr.length > 2) {
      const disambigStr = moveStr.slice(0, -2);
      if (disambigStr.length === 1) {
        const f = 'abcdefgh'.indexOf(disambigStr[0]!);
        if (f >= 0) disambigFile = f;
        else disambigRank = parseInt(disambigStr[0]!) - 1;
      } else if (disambigStr.length >= 2) {
        const sq = parseSquare(disambigStr);
        if (sq !== null) {
          disambigFile = fileOf(sq);
          disambigRank = rankOf(sq);
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
      if (disambigFile !== null && fileOf(m.from) !== disambigFile)
        return false;
      if (disambigRank !== null && rankOf(m.from) !== disambigRank)
        return false;
      return true;
    }) ?? null
  );
};
