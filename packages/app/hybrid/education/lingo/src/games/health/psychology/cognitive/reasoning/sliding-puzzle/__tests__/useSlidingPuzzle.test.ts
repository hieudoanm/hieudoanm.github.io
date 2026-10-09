import { act, renderHook } from '@testing-library/react';
import { useSlidingPuzzle } from '../useSlidingPuzzle';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeAll(() => {
  jest.useFakeTimers();
  (global as any).Image = class {
    _onload: (() => void) | null = null;
    get onload() {
      return this._onload;
    }
    set onload(fn: (() => void) | null) {
      this._onload = fn;
    }
    set src(_url: string) {
      if (this._onload) setTimeout(() => this._onload!(), 0);
    }
    get src() {
      return '';
    }
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.cropToCenterSquare.mockResolvedValue(
    'data:image/png;base64,fake'
  );
  mockedUtils.generateTileImages.mockReturnValue(
    Array.from({ length: 9 }, (_, i) => `img${i}`)
  );
  mockedUtils.shuffleBoard.mockReturnValue({
    tiles: [1, 2, 3, 4, 0, 6, 7, 8, 5],
    emptyIndex: 4,
    shuffleMoves: [
      [4, 5],
      [3, 4],
    ],
  });
  mockedUtils.getAdjacent.mockImplementation((pos: number, n: number) => {
    const row = Math.floor(pos / n);
    const col = pos % n;
    const adj: number[] = [];
    if (row > 0) adj.push(pos - n);
    if (row < n - 1) adj.push(pos + n);
    if (col > 0) adj.push(pos - 1);
    if (col < n - 1) adj.push(pos + 1);
    return adj;
  });
  mockedUtils.isSolved.mockReturnValue(false);
});

afterAll(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

async function setupBoard() {
  const { result } = renderHook(() => useSlidingPuzzle());
  const file = new File([''], 'test.png', { type: 'image/png' });
  await act(async () => {
    await result.current.handleFile(file);
  });
  await act(async () => {
    jest.runAllTimers();
  });
  return result;
}

describe('useSlidingPuzzle', () => {
  describe('initial state', () => {
    it('has correct default values', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      expect(result.current.imageUrl).toBeNull();
      expect(result.current.tiles).toEqual([]);
      expect(result.current.gridSize).toBe(3);
      expect(result.current.emptyIndex).toBe(-1);
      expect(result.current.movesCount).toBe(0);
      expect(result.current.solved).toBe(false);
      expect(result.current.autoSolving).toBe(false);
      expect(result.current.dragging).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('handleFile', () => {
    it('rejects non-image files', async () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      await act(async () => {
        await result.current.handleFile(file);
      });
      expect(result.current.imageUrl).toBeNull();
      expect(mockedUtils.cropToCenterSquare).not.toHaveBeenCalled();
    });

    it('crops uploaded image', async () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      const file = new File([''], 'test.png', { type: 'image/png' });
      await act(async () => {
        await result.current.handleFile(file);
      });
      expect(mockedUtils.cropToCenterSquare).toHaveBeenCalledWith(file);
    });

    it('sets error on processing failure', async () => {
      mockedUtils.cropToCenterSquare.mockRejectedValue(new Error('fail'));
      const { result } = renderHook(() => useSlidingPuzzle());
      const file = new File([''], 'test.png', { type: 'image/png' });
      await act(async () => {
        await result.current.handleFile(file);
      });
      expect(result.current.error).toBe('Failed to process image');
    });
  });

  describe('board initialization', () => {
    it('builds tile images and shuffles after upload', async () => {
      const result = await setupBoard();
      expect(mockedUtils.generateTileImages).toHaveBeenCalled();
      expect(mockedUtils.shuffleBoard).toHaveBeenCalledWith(3);
      expect(result.current.tiles).toEqual([1, 2, 3, 4, 0, 6, 7, 8, 5]);
      expect(result.current.emptyIndex).toBe(4);
      expect(result.current.movesCount).toBe(0);
      expect(result.current.solved).toBe(false);
    });

    it('re-initializes when grid size changes', async () => {
      const result = await setupBoard();
      mockedUtils.shuffleBoard.mockClear();

      act(() => {
        result.current.handleGridSizeChange(4);
      });
      await act(async () => {
        jest.runAllTimers();
      });

      expect(mockedUtils.shuffleBoard).toHaveBeenCalledWith(4);
    });
  });

  describe('handleClick', () => {
    it('swaps adjacent tile with empty space', async () => {
      const result = await setupBoard();
      act(() => {
        result.current.handleClick(5);
      });
      expect(result.current.tiles[4]).toBe(6);
      expect(result.current.tiles[5]).toBe(0);
      expect(result.current.movesCount).toBe(1);
    });

    it('ignores non-adjacent tile', async () => {
      const result = await setupBoard();
      act(() => {
        result.current.handleClick(0);
      });
      expect(result.current.tiles).toEqual([1, 2, 3, 4, 0, 6, 7, 8, 5]);
      expect(result.current.movesCount).toBe(0);
    });

    it('does nothing when auto-solving', async () => {
      const result = await setupBoard();
      act(() => {
        result.current.startAutoSolve();
      });
      act(() => {
        result.current.handleClick(5);
      });
      expect(result.current.movesCount).toBe(0);
    });
  });

  describe('handleGridSizeChange', () => {
    it('updates grid size', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      act(() => {
        result.current.handleGridSizeChange(5);
      });
      expect(result.current.gridSize).toBe(5);
    });
  });

  describe('handleNewGame', () => {
    it('re-initializes board when image is loaded', async () => {
      const result = await setupBoard();
      mockedUtils.shuffleBoard.mockClear();

      act(() => {
        result.current.handleNewGame();
      });
      await act(async () => {
        jest.runAllTimers();
      });

      expect(mockedUtils.shuffleBoard).toHaveBeenCalledTimes(1);
      expect(result.current.movesCount).toBe(0);
    });
  });

  describe('handleChangeImage', () => {
    it('clears imageUrl', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      act(() => {
        result.current.handleChangeImage();
      });
      expect(result.current.imageUrl).toBeNull();
    });
  });

  describe('startAutoSolve', () => {
    it('does nothing when shuffleMoves is empty', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      act(() => {
        result.current.startAutoSolve();
      });
      expect(result.current.autoSolving).toBe(false);
    });

    it('starts solving when shuffleMoves has entries', async () => {
      const result = await setupBoard();
      act(() => {
        result.current.startAutoSolve();
      });
      expect(result.current.autoSolving).toBe(true);
    });

    it('stops auto-solving when called again', async () => {
      const result = await setupBoard();
      act(() => {
        result.current.startAutoSolve();
      });
      act(() => {
        result.current.startAutoSolve();
      });
      expect(result.current.autoSolving).toBe(false);
    });

    it('applies each shuffle move in reverse order with delay', async () => {
      const result = await setupBoard();
      const initialTiles = [...result.current.tiles];

      act(() => {
        result.current.startAutoSolve();
      });

      await act(async () => {
        jest.advanceTimersByTime(80);
      });
      expect(result.current.tiles).not.toEqual(initialTiles);

      await act(async () => {
        jest.advanceTimersByTime(80);
      });
      expect(result.current.autoSolving).toBe(false);
    });
  });

  describe('drag handlers', () => {
    it('handleDragOver sets dragging and prevents default', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      const preventDefault = jest.fn();
      act(() => {
        result.current.handleDragOver({ preventDefault } as any);
      });
      expect(result.current.dragging).toBe(true);
      expect(preventDefault).toHaveBeenCalled();
    });

    it('handleDragLeave clears dragging', () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      act(() => {
        result.current.handleDragOver({ preventDefault: jest.fn() } as any);
      });
      act(() => {
        result.current.handleDragLeave();
      });
      expect(result.current.dragging).toBe(false);
    });

    it('handleDrop processes dropped image', async () => {
      const { result } = renderHook(() => useSlidingPuzzle());
      const file = new File([''], 'drop.png', { type: 'image/png' });
      const preventDefault = jest.fn();
      await act(async () => {
        result.current.handleDrop({
          preventDefault,
          dataTransfer: { files: [file] },
        } as any);
      });
      expect(preventDefault).toHaveBeenCalled();
      expect(result.current.dragging).toBe(false);
      expect(mockedUtils.cropToCenterSquare).toHaveBeenCalledWith(file);
    });
  });
});
