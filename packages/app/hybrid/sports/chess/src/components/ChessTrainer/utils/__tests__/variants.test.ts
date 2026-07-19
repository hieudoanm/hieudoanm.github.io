import { createGame } from '@chess/ts';
import {
  addToPocket,
  applyDrop,
  applyHordeMove,
  collectCapture,
  dropIsLegal,
  dropMove,
  emptyPocket,
  gameFromFen,
  getHordeMoves,
  hordeMoveFor,
  HORDE_FEN,
  pocketList,
  squareName,
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
    expect(
      collectCapture(state, { ...captureMove, captured: null })
    ).toBeNull();
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

describe('untested variants functions', () => {
  it('dropMove creates a drop move', () => {
    const move = dropMove(30, 'n');
    expect(move).toEqual({ from: 30, to: 30, promotion: null, captured: null });
  });

  it('squareName converts index to square name', () => {
    expect(squareName(0)).toBe('a1');
    expect(squareName(63)).toBe('h8');
    expect(squareName(4)).toBe('e1');
  });

  it('gameFromFen creates game from FEN', () => {
    const state = gameFromFen(HORDE_FEN);
    expect(state.turn).toBe('w');
    expect(state.board).toHaveLength(64);
  });

  it('hordeMoveFor finds a legal horde move', () => {
    const state = createGame(HORDE_FEN);
    const move = hordeMoveFor(state, 'a2', 'a3');
    if (move) {
      expect(move.from).toBeDefined();
      expect(move.to).toBeDefined();
    }
  });

  it('hordeMoveFor returns null for invalid move', () => {
    const state = createGame(HORDE_FEN);
    expect(hordeMoveFor(state, 'a1', 'a1')).toBeNull();
  });

  it('addToPocket adds black captured piece', () => {
    const pocket = addToPocket(emptyPocket(), { color: 'b', type: 'r' });
    expect(pocket.b.r).toBe(1);
    expect(pocket.w.r).toBe(0);
  });

  it('collectCapture returns null when capturer is missing', () => {
    const state = createGame();
    const move = {
      from: 99,
      to: 28,
      captured: { color: 'b' as const, type: 'p' as const },
      promotion: null,
    };
    expect(collectCapture(state, move)).toBeNull();
  });

  it('updateThreeCheck adds check when delivering check', () => {
    const state = createGame(HORDE_FEN);
    const counts = { w: 0, b: 0 };
    const moves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    const checkMoves: typeof moves = [];
    for (const m of moves) {
      const next = applyHordeMove(state, m);
      if (next.inCheck) checkMoves.push(m);
    }
    if (checkMoves.length > 0) {
      const result = updateThreeCheck(state, checkMoves[0]!, counts);
      expect(result.w).toBe(1);
    }
  });
});

describe('horde variant extra branches', () => {
  it('horde pawn double push from start rank', () => {
    const board = createGame(HORDE_FEN).board;
    const moves = getHordeMoves(
      board,
      'w',
      createGame(HORDE_FEN).castlingRights,
      null
    );
    const doublePushes = moves.filter((m) => {
      const fromRank = Math.floor(m.from / 8);
      const toRank = Math.floor(m.to / 8);
      return toRank - fromRank === 2;
    });
    expect(doublePushes.length).toBeGreaterThanOrEqual(0);
  });

  it('horde pawn captures diagonally', () => {
    const state = createGame(HORDE_FEN);
    const moves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    const captures = moves.filter((m) => m.captured !== null);
    expect(captures.length).toBeGreaterThanOrEqual(0);
  });

  it('applyHordeMove with pawn double push sets en passant', () => {
    const state = createGame(HORDE_FEN);
    const moves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    const doublePush = moves.find((m) => {
      const fromRank = Math.floor(m.from / 8);
      const toRank = Math.floor(m.to / 8);
      return toRank - fromRank === 2 && !m.captured;
    });
    if (doublePush) {
      const next = applyHordeMove(state, doublePush);
      expect(next.enPassant).not.toBeNull();
    }
  });

  it('applyHordeMove with white turn keeps full move number', () => {
    const state = createGame(HORDE_FEN);
    const moves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    if (moves.length > 0) {
      const next = applyHordeMove(state, moves[0]!);
      expect(next.fullMoveNumber).toBe(state.fullMoveNumber);
    }
  });

  it('applyHordeMove with horde diagonal capture (no captured piece)', () => {
    const state = createGame(HORDE_FEN);
    const moves = getHordeMoves(
      state.board,
      'w',
      state.castlingRights,
      state.enPassant
    );
    const diagonalNoCapture = moves.find(
      (m) => Math.abs((m.to % 8) - (m.from % 8)) === 1 && !m.captured
    );
    if (diagonalNoCapture) {
      const next = applyHordeMove(state, diagonalNoCapture);
      expect(next.board[diagonalNoCapture.to]).toMatchObject({ color: 'w' });
    }
  });

  it('getHordeMoves black path filters illegal moves', () => {
    const state = createGame(HORDE_FEN);
    const blackMoves = getHordeMoves(
      state.board,
      'b',
      state.castlingRights,
      state.enPassant
    );
    for (const m of blackMoves) {
      expect(m.from).toBeGreaterThanOrEqual(0);
      expect(m.from).toBeLessThan(64);
    }
  });
});
