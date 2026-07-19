import { renderHook } from '@testing-library/react';
import { useEngineIntegration } from '../useEngineIntegration';
import { createGame } from '@chess/ts';

const mockAnalyze = jest.fn();
const mockDispatch = jest.fn();
const gameRef = { current: createGame() };

beforeEach(() => {
  jest.clearAllMocks();
  gameRef.current = createGame();
});

describe('useEngineIntegration', () => {
  const base = (overrides: Record<string, unknown> = {}) => ({
    boardMode: 'explore' as const,
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    thinking: false,
    depth: 15,
    humanSide: 'w' as 'w',
    gameRef,
    dispatch: mockDispatch,
    analyze: mockAnalyze,
    bestMove: null as string | null,
    evaluation: null as number | null,
    onEngineMove: jest.fn(),
    ...overrides,
  });

  it('returns default values in explore mode', () => {
    const { result } = renderHook(() => useEngineIntegration(base()));
    expect(result.current.whiteEval).toBeNull();
    expect(result.current.evalPercent).toBe(50);
    expect(result.current.statusLabel).toBeNull();
  });

  it('returns eval when in play mode with evaluation', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play', evaluation: 50 }))
    );
    expect(result.current.whiteEval).toBe(50);
    expect(result.current.evalPercent).toBe(52.5);
    expect(result.current.evalLabel).toBe('0.5');
  });

  it('returns status label in play mode on human turn', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play' }))
    );
    expect(result.current.statusLabel).toBe('Your turn');
  });

  it('shows Check! when in check', () => {
    const game = createGame();
    game.inCheck = true;
    gameRef.current = game;
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play' }))
    );
    expect(result.current.statusLabel).toBe('Check!');
  });

  it('shows thinking label when thinking', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play', thinking: true }))
    );
    expect(result.current.statusLabel).toBe('Stockfish thinking…');
  });

  it('calls analyze when it is engine turn in play mode', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(
        base({
          boardMode: 'play',
        })
      )
    );
    // engineSide is 'b' when humanSide is 'w', and starting position is white to move
    // So engine won't analyze on the first render (it's white's turn)
    // But if we change humanSide to 'b', engineSide becomes 'w' and it will analyze
    mockAnalyze.mockClear();
    const { result: result2 } = renderHook(() =>
      useEngineIntegration(
        base({
          boardMode: 'play',
          humanSide: 'b',
        })
      )
    );
    expect(mockAnalyze).toHaveBeenCalled();
  });

  it('applies bestMove when engine turn', () => {
    const onEngineMove = jest.fn();
    // Set humanSide to 'b' so engineSide is 'w', and starting position is white to move
    renderHook(() =>
      useEngineIntegration(
        base({
          boardMode: 'play',
          humanSide: 'b',
          bestMove: 'e2e4',
          onEngineMove,
        })
      )
    );
    expect(onEngineMove).toHaveBeenCalled();
  });

  it('ignores bestMove when not engine turn', () => {
    const onEngineMove = jest.fn();
    // humanSide is 'w', engineSide is 'b', starting position is white to move
    // So bestMove should be ignored because it's not engine's turn
    renderHook(() =>
      useEngineIntegration(
        base({
          boardMode: 'play',
          humanSide: 'w',
          bestMove: 'e2e4',
          onEngineMove,
        })
      )
    );
    expect(onEngineMove).not.toHaveBeenCalled();
  });

  it('returns null statusLabel in explore mode', () => {
    const { result } = renderHook(() => useEngineIntegration(base()));
    expect(result.current.statusLabel).toBeNull();
  });

  it('clamps evalPercent for extreme values', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play', evaluation: 5000 }))
    );
    expect(result.current.evalPercent).toBe(100);
  });

  it('clamps evalPercent for very negative values', () => {
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play', evaluation: -5000 }))
    );
    expect(result.current.evalPercent).toBe(0);
  });

  it('returns zero evalLabel for null eval', () => {
    const { result } = renderHook(() => useEngineIntegration(base()));
    expect(result.current.evalLabel).toBe('0.0');
  });

  it('shows Draw for draw status', () => {
    const game = createGame();
    game.status = 'draw';
    gameRef.current = game;
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play' }))
    );
    expect(result.current.statusLabel).toBe('Draw');
  });

  it('shows Checkmate! for checkmate status', () => {
    const game = createGame();
    game.status = 'checkmate';
    gameRef.current = game;
    const { result } = renderHook(() =>
      useEngineIntegration(base({ boardMode: 'play' }))
    );
    expect(result.current.statusLabel).toBe('Checkmate!');
  });
});
