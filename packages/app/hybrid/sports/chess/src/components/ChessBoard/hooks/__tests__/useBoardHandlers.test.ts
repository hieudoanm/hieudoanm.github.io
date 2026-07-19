import { renderHook, act } from '@testing-library/react';
import { useBoardHandlers } from '../useBoardHandlers';
import { createGame } from '@chess/ts';

const mockDispatch = jest.fn();
const mockCommitMove = jest.fn();
const gameRef = { current: createGame() };

const base = (overrides: Record<string, unknown> = {}) => ({
  boardMode: 'explore' as const,
  panel: 'position' as const,
  selectedSquare: null as string | null,
  legalTargets: [] as string[],
  setupMode: false,
  setupPalette: null as string | null,
  humanSide: 'w' as 'w',
  gameRef,
  commitMove: mockCommitMove,
  dispatch: mockDispatch,
  ...overrides,
});

beforeEach(() => {
  mockDispatch.mockClear();
  mockCommitMove.mockClear();
  gameRef.current = createGame();
});

describe('useBoardHandlers', () => {
  it('returns all handler functions', () => {
    const { result } = renderHook(() => useBoardHandlers(base()));
    expect(typeof result.current.tryPlay).toBe('function');
    expect(typeof result.current.onPieceDrop).toBe('function');
    expect(typeof result.current.canDragPiece).toBe('function');
    expect(typeof result.current.onSquareClick).toBe('function');
    expect(typeof result.current.playSan).toBe('function');
  });

  describe('tryPlay', () => {
    it('returns false when panel is openings', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ panel: 'openings' }))
      );
      expect(result.current.tryPlay('e2', 'e4')).toBe(false);
    });

    it('returns false when it is not human side in play mode', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ boardMode: 'play', humanSide: 'w' }))
      );
      gameRef.current = createGame();
      expect(result.current.tryPlay('e7', 'e5')).toBe(false);
    });

    it('makes a legal move on the human side', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      const ok = result.current.tryPlay('e2', 'e4');
      expect(ok).toBe(true);
      expect(mockCommitMove).toHaveBeenCalled();
    });

    it('returns false for illegal move', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      expect(result.current.tryPlay('e2', 'e5')).toBe(false);
    });
  });

  describe('onPieceDrop', () => {
    it('returns false when targetSquare is null', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      expect(
        result.current.onPieceDrop({
          sourceSquare: 'e2',
          targetSquare: null,
        })
      ).toBe(false);
    });

    it('delegates to tryPlay', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      const ok = result.current.onPieceDrop({
        sourceSquare: 'e2',
        targetSquare: 'e4',
      });
      expect(ok).toBe(true);
    });
  });

  describe('canDragPiece', () => {
    it('returns false when panel is openings', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ panel: 'openings' }))
      );
      expect(
        result.current.canDragPiece({
          isSparePiece: false,
          piece: { pieceType: 'wP' },
          square: 'e2',
        })
      ).toBe(false);
    });

    it('returns true in explore mode for any piece', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      expect(
        result.current.canDragPiece({
          isSparePiece: false,
          piece: { pieceType: 'bP' },
          square: 'e7',
        })
      ).toBe(true);
    });

    it('returns true in play mode for human side pieces', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ boardMode: 'play', humanSide: 'w' }))
      );
      expect(
        result.current.canDragPiece({
          isSparePiece: false,
          piece: { pieceType: 'wP' },
          square: 'e2',
        })
      ).toBe(true);
    });

    it('returns false in play mode for opponent pieces', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ boardMode: 'play', humanSide: 'w' }))
      );
      expect(
        result.current.canDragPiece({
          isSparePiece: false,
          piece: { pieceType: 'bP' },
          square: 'e7',
        })
      ).toBe(false);
    });
  });

  describe('onSquareClick', () => {
    it('dispatches SETUP_SQUARE in setup mode', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ setupMode: true, setupPalette: 'Pw' }))
      );
      act(() => result.current.onSquareClick({ square: 'e4' }));
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SETUP_SQUARE',
        square: 'e4',
        piece: 'Pw',
      });
    });

    it('returns early when panel is openings', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ panel: 'openings' }))
      );
      act(() => result.current.onSquareClick({ square: 'e4' }));
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('clears selection when clicking same square', () => {
      const { result } = renderHook(() =>
        useBoardHandlers(base({ selectedSquare: 'e4' }))
      );
      act(() => result.current.onSquareClick({ square: 'e4' }));
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SELECTION' });
    });

    it('selects a piece on its own square with legal moves', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      act(() => result.current.onSquareClick({ square: 'e2' }));
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SELECTED',
        square: 'e2',
        targets: expect.arrayContaining(['e4']),
      });
    });

    it('clears selection when clicking empty square', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      act(() => result.current.onSquareClick({ square: 'e5' }));
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SELECTION' });
    });
  });

  describe('playSan', () => {
    it('plays a valid SAN move', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      const ok = result.current.playSan('e4');
      expect(ok).toBe(true);
      expect(mockCommitMove).toHaveBeenCalled();
    });

    it('returns false for invalid SAN', () => {
      const { result } = renderHook(() => useBoardHandlers(base()));
      expect(result.current.playSan('zz')).toBe(false);
    });
  });
});
