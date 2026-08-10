import { act, renderHook } from '@testing-library/react';
import { createGame } from '@chess/ts';
import { useEngineIntegration } from '../useEngineIntegration';

const makeGame = (overrides: Partial<Record<string, unknown>> = {}) => ({
  ...createGame(),
  ...overrides,
});

const makeDeps = (overrides: Partial<Record<string, unknown>> = {}) => ({
  boardMode: 'explore',
  fen: '',
  thinking: false,
  gameRef: { current: makeGame() },
  dispatch: jest.fn(),
  analyze: jest.fn(),
  bestMove: null,
  evaluation: null,
  ...overrides,
});

describe('useEngineIntegration', () => {
  it('analyzes when black to move in play mode', () => {
    const game = makeGame({ turn: 'b' });
    const deps = makeDeps({
      boardMode: 'play',
      fen: 'x',
      gameRef: { current: game },
    });
    renderHook(() => useEngineIntegration(deps as never));
    expect(deps.analyze).toHaveBeenCalled();
  });

  it('does not analyze in explore mode', () => {
    const game = makeGame({ turn: 'b' });
    const deps = makeDeps({
      boardMode: 'explore',
      gameRef: { current: game },
    });
    renderHook(() => useEngineIntegration(deps as never));
    expect(deps.analyze).not.toHaveBeenCalled();
  });

  it('does not analyze when white to move', () => {
    const game = makeGame({ turn: 'w' });
    const deps = makeDeps({
      boardMode: 'play',
      fen: 'x',
      gameRef: { current: game },
    });
    renderHook(() => useEngineIntegration(deps as never));
    expect(deps.analyze).not.toHaveBeenCalled();
  });

  it('applies a legal best move on black turn', () => {
    const game = makeGame({ turn: 'b' });
    const dispatch = jest.fn();
    const deps = makeDeps({
      boardMode: 'play',
      bestMove: 'e2e4',
      gameRef: { current: game },
      dispatch,
    });
    renderHook(() => useEngineIntegration(deps as never));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_THINKING',
      thinking: false,
    });
  });

  it('ignores a best move with invalid squares', () => {
    const game = makeGame({ turn: 'b' });
    const dispatch = jest.fn();
    const deps = makeDeps({
      boardMode: 'play',
      bestMove: 'zz',
      gameRef: { current: game },
      dispatch,
    });
    renderHook(() => useEngineIntegration(deps as never));
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('computes eval percent clamped to range', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(
        makeDeps({ boardMode: 'play', evaluation: 2000 }) as never
      )
    );
    expect(result.current.whiteEval).toBe(2000);
    expect(result.current.evalPercent).toBe(100);
    expect(result.current.evalLabel).toBe('20.0');
  });

  it('returns neutral eval when not in play mode', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(makeDeps() as never)
    );
    expect(result.current.whiteEval).toBeNull();
    expect(result.current.evalPercent).toBe(50);
    expect(result.current.evalLabel).toBe('0.0');
  });

  it('produces status labels', () => {
    const cases: Array<[Partial<Record<string, unknown>>, string | null]> = [
      [
        {
          gameRef: { current: makeGame({ status: 'checkmate' }) },
          boardMode: 'play',
        },
        'Checkmate!',
      ],
      [
        {
          gameRef: { current: makeGame({ status: 'draw' }) },
          boardMode: 'play',
        },
        'Draw',
      ],
      [
        {
          gameRef: { current: makeGame({ status: 'stalemate' }) },
          boardMode: 'play',
        },
        'Draw',
      ],
      [
        {
          gameRef: { current: makeGame({ inCheck: true }) },
          boardMode: 'play',
        },
        'Check!',
      ],
      [
        {
          gameRef: { current: makeGame({ turn: 'w' }) },
          boardMode: 'play',
          thinking: true,
        },
        'Stockfish thinking…',
      ],
      [
        { gameRef: { current: makeGame({ turn: 'w' }) }, boardMode: 'play' },
        'Your turn (White)',
      ],
      [
        { gameRef: { current: makeGame({ turn: 'b' }) }, boardMode: 'play' },
        null,
      ],
      [{ boardMode: 'explore' }, null],
    ];

    cases.forEach(([deps, expected]) => {
      const { result } = renderHook(() =>
        useEngineIntegration(makeDeps(deps) as never)
      );
      expect(result.current.statusLabel).toBe(expected);
    });
  });
});
