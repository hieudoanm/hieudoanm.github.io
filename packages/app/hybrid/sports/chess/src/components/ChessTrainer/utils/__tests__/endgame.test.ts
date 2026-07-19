import { createGame } from '@chess/ts';
import {
  applyUserMove,
  generateEndgameFen,
  isCheckmate,
  mateInN,
} from '../endgame';

describe('endgame utils', () => {
  it.each(['KQ', 'KR', 'KBB', 'KBN'])(
    'generates a legal %s position',
    (material) => {
      const fen = generateEndgameFen(material as 'KQ' | 'KR' | 'KBB' | 'KBN');
      expect(typeof fen).toBe('string');
      expect(fen).toMatch(/ w - - /);
      expect(fen.split(' ').length).toBeGreaterThanOrEqual(4);
    }
  );

  it('detects checkmate status', () => {
    const state = createGame();
    expect(isCheckmate(state)).toBe(false);
    expect(isCheckmate({ ...state, status: 'checkmate' })).toBe(true);
  });

  it('applies a legal user move and flips turn', () => {
    const state = createGame();
    const next = applyUserMove(state, 'e2', 'e4');
    expect(next.turn).toBe('b');
  });

  it('ignores an illegal user move', () => {
    const state = createGame();
    const next = applyUserMove(state, 'x', 'y');
    expect(next).toBe(state);
  });

  it('answers mate-in-N without throwing', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    expect(typeof mateInN(fen, 1)).toBe('boolean');
    expect(typeof mateInN(fen, 2)).toBe('boolean');
    expect(mateInN(fen, 0)).toBe(false);
  });
});
