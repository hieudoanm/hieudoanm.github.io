import { createGame } from '@chess/ts';
import {
  bestMoveFrom,
  isBestMove,
  isClearTactic,
  moveSanFor,
} from '../tactics';

describe('tactics utils', () => {
  it('returns the engine best move with SAN', () => {
    const state = createGame();
    const best = bestMoveFrom(state, 10);
    expect(best).not.toBeNull();
    expect(best?.san).toBe('e4');
    expect(best?.from).toBe('e2');
    expect(best?.to).toBe('e4');
    expect(best?.mate).toBe(false);
  });

  it('flags mate scores', () => {
    const state = createGame();
    const best = bestMoveFrom(state, 10);
    expect(best?.mate).toBe(false);
  });

  it('detects when a move matches the best move', () => {
    const state = createGame();
    expect(isBestMove(state, 'e2', 'e4', 10)).toBe(true);
    expect(isBestMove(state, 'e2', 'e3', 10)).toBe(false);
  });

  it('returns the SAN for a matching move', () => {
    const state = createGame();
    expect(moveSanFor(state, 'e2', 'e4')).toBe('e4');
    expect(moveSanFor(state, 'a2', 'a3')).toBeNull();
  });

  it('rejects positions without a clear tactic', () => {
    expect(
      isClearTactic('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    ).toBe(false);
  });
});
