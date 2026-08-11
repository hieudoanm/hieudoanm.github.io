import { createGame } from '@chess/ts';
import {
  addToPocket,
  applyDrop,
  applyHordeMove,
  collectCapture,
  dropIsLegal,
  emptyPocket,
  getHordeMoves,
  HORDE_FEN,
  pocketList,
  THREE_CHECK_WIN,
  threeCheckWinner,
  updateThreeCheck,
} from '../variants';

const captureMove = {
  from: 12,
  to: 28,
  captured: { color: 'b' as const, type: 'p' as const },
  promotion: null,
};

describe('three-check variants', () => {
  it('does not add a check when no check is delivered', () => {
    const state = createGame();
    const counts = { w: 0, b: 0 };
    expect(updateThreeCheck(state, captureMove, counts)).toEqual(counts);
  });

  it('declares a winner at three checks', () => {
    expect(threeCheckWinner({ w: THREE_CHECK_WIN, b: 0 })).toBe('w');
    expect(threeCheckWinner({ w: 0, b: THREE_CHECK_WIN })).toBe('b');
    expect(threeCheckWinner({ w: 2, b: 2 })).toBeNull();
  });
});

describe('horde variant', () => {
  it('generates pawn moves for white and legal moves for black', () => {
    const state = createGame(HORDE_FEN);
    const whiteMoves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    const blackMoves = getHordeMoves(
      state.board,
      'b',
      state.castlingRights,
      state.enPassant
    );
    expect(whiteMoves.length).toBeGreaterThan(0);
    expect(blackMoves.length).toBeGreaterThan(0);
    expect(whiteMoves.every((m) => m.from >= 0 && m.from < 64)).toBe(true);
  });

  it('applies a white horde move and flips the turn', () => {
    const state = createGame(HORDE_FEN);
    const whiteMove = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    )[0]!;
    const next = applyHordeMove(state, whiteMove);
    expect(next.turn).toBe('b');
    expect(next.board[whiteMove.to]).toMatchObject({ color: 'w', type: 'p' });
  });

  it('applies black moves via makeMove', () => {
    const state = createGame(HORDE_FEN);
    const blackMove = getHordeMoves(
      state.board,
      'b',
      state.castlingRights,
      state.enPassant
    )[0]!;
    const next = applyHordeMove(state, blackMove);
    expect(next.turn).toBe('b');
  });
});

describe('crazyhouse variant', () => {
  it('collects the captured piece into a pocket', () => {
    const pocket = addToPocket(emptyPocket(), { color: 'w', type: 'p' });
    expect(pocket.w.p).toBe(1);
  });

  it('collectCapture returns the piece won by the capturer', () => {
    const state = createGame();
    expect(collectCapture(state, captureMove)).toEqual({
      color: 'w',
      type: 'p',
    });
    expect(collectCapture(state, { ...captureMove, captured: null })).toBeNull();
  });

  it('lists pocket contents', () => {
    const pocket = addToPocket(emptyPocket(), { color: 'w', type: 'p' });
    const list = pocketList(pocket, 'w');
    expect(list).toEqual([{ type: 'p', count: 1 }]);
    expect(pocketList(pocket, 'b')).toEqual([]);
  });

  it('validates drops', () => {
    const state = createGame();
    expect(dropIsLegal(state.board, 30, 'p', 'w')).toBe(true);
    expect(dropIsLegal(state.board, 0, 'p', 'w')).toBe(false);
    expect(dropIsLegal(state.board, 63, 'p', 'w')).toBe(false);
    expect(dropIsLegal(state.board, 4, 'q', 'w')).toBe(false);
    expect(dropIsLegal(state.board, 30, 'k', 'w')).toBe(false);
  });

  it('applies a drop to the board', () => {
    const state = createGame();
    const board = applyDrop(state.board, 30, 'n', 'w');
    expect(board[30]).toMatchObject({ color: 'w', type: 'n' });
  });
});
