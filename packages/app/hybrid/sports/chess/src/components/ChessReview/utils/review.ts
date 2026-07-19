import type { Board, Color, GameState, Move } from '@chess/ts';
import {
  calculateAccuracy,
  classifyMove,
  createGame,
  findBestMove,
  fromSan,
  isSquareAttacked,
  makeMove,
  toFen,
  toSan,
  toSquareName,
  winPercentFromCentipawns,
} from '@chess/ts';
import type {
  HangingPiece,
  ReviewedMove,
  ReviewResult,
  ReviewSide,
} from '../types';

export interface ReviewOptions {
  fen?: string;
  depth?: number;
}

const mateScore = (score: number): boolean => score > 20000 || score < -20000;

const bestMoveFor = (
  state: GameState,
  depth: number
): { san: string; score: number } | null => {
  const best = findBestMove(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant,
    { depth }
  );
  if (!best.move) return null;
  const san = toSan(
    state.board,
    best.move,
    state.turn,
    state.castlingRights,
    state.enPassant
  );
  return { san, score: best.score };
};

export const sanToMove = (state: GameState, san: string): Move | null =>
  fromSan(san, state.board, state.turn, state.castlingRights, state.enPassant);

export const findHangingPiece = (
  board: Board,
  color: Color
): HangingPiece | null => {
  const opponent: Color = color === 'w' ? 'b' : 'w';
  let result: HangingPiece | null = null;
  for (let sq = 0; sq < 64; sq += 1) {
    const piece = board[sq];
    if (!piece || piece.color !== color || piece.type === 'k') continue;
    if (
      isSquareAttacked(board, sq, opponent) &&
      !isSquareAttacked(board, sq, color)
    ) {
      result = { square: toSquareName(sq), piece: piece.type, color };
      break;
    }
  }
  return result;
};

const emptySide = (): ReviewSide => ({
  accuracy: 100,
  best: 0,
  inaccuracies: 0,
  mistakes: 0,
  blunders: 0,
  missedMate: 0,
  hanging: 0,
});

const parseMoves = (pgn: string): string[] => {
  const moves: string[] = [];
  for (const token of pgn.replace(/\r/g, ' ').split(/\s+/)) {
    if (/^1-0$|^0-1$|^1\/2|^\*$/.test(token)) continue;
    const san = token.replace(/^(\d+\.(?:\.\.)?)/, '').trim();
    if (san && /^[a-hKQRBNO0-9+#=x-]+$/.test(san)) moves.push(san);
  }
  return moves;
};

export const reviewPgn = (
  pgn: string,
  { fen, depth = 8 }: ReviewOptions = {}
): ReviewResult | null => {
  const moves = parseMoves(pgn);
  let state = createGame(fen ?? undefined);
  const reviewed: ReviewedMove[] = [];
  let worst: { san: string; lost: number } | null = null;
  let best: { san: string; lost: number } | null = null;
  let moveNumber = 1;

  for (const san of moves) {
    const color: Color = state.turn;
    const before = bestMoveFor(state, depth);
    const beforeWin = winPercentFromCentipawns(before?.score ?? 0);

    const move = sanToMove(state, san);
    if (!move) break;
    const next = makeMove(state, move);
    const scoreAfter = findBestMove(
      next.board,
      next.turn,
      next.castlingRights,
      next.enPassant,
      { depth }
    ).score;
    const moverPerspective = color === 'w' ? scoreAfter : -scoreAfter;
    const afterWin = winPercentFromCentipawns(moverPerspective);
    const lost = Math.max(0, beforeWin - afterWin);

    const record: ReviewedMove = {
      moveNumber,
      color,
      san,
      fen: toFen(next),
      bestSan: before?.san ?? null,
      winPercentBefore: beforeWin,
      winPercentAfter: afterWin,
      winPercentLost: lost,
      classification: classifyMove(lost),
      accuracy: calculateAccuracy(lost),
      missedMate: !!before && mateScore(before.score) && before.score > 0,
      hanging: findHangingPiece(next.board, color),
    };
    reviewed.push(record);

    if (worst === null || lost > worst.lost) worst = { san, lost };
    if (best === null || lost < best.lost) best = { san, lost };
    state = next;
    moveNumber += color === 'b' ? 1 : 0;
  }

  if (reviewed.length === 0) return null;

  const white = emptySide();
  const black = emptySide();
  const accumulate = (target: ReviewSide, r: ReviewedMove) => {
    if (r.classification.code === 'best') target.best += 1;
    if (r.classification.code === 'inaccuracy') target.inaccuracies += 1;
    if (r.classification.code === 'mistake') target.mistakes += 1;
    if (r.classification.code === 'blunder') target.blunders += 1;
    if (r.missedMate) target.missedMate += 1;
    if (r.hanging) target.hanging += 1;
  };

  for (const r of reviewed) {
    if (r.color === 'w') accumulate(white, r);
    else accumulate(black, r);
  }

  const sideAccuracy = (side: ReviewedMove[]) =>
    side.length
      ? Math.round(side.reduce((sum, r) => sum + r.accuracy, 0) / side.length)
      : 100;
  white.accuracy = sideAccuracy(reviewed.filter((r) => r.color === 'w'));
  black.accuracy = sideAccuracy(reviewed.filter((r) => r.color === 'b'));

  return {
    white,
    black,
    moves: reviewed,
    bestMove: best?.san ?? null,
    worstMove: worst?.san ?? null,
  };
};
