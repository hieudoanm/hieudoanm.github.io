import { renderHook, act } from '@testing-library/react';
import { useShare } from '../useShare';

describe('useShare', () => {
  const onLoad = jest.fn();

  beforeEach(() => {
    onLoad.mockClear();
    jest.restoreAllMocks();
  });

  const mockSearchParams = (getImpl: (key: string) => string | null) => {
    jest.spyOn(global, 'URLSearchParams').mockImplementation(
      () =>
        ({
          get: getImpl,
          set: jest.fn(),
          toString: () => 'mocked',
        }) as unknown as URLSearchParams
    );
  };

  it('calls onLoad with fen search param on mount', () => {
    mockSearchParams((key) => (key === 'fen' ? 'abc' : null));
    renderHook(() => useShare({ fen: 'f', pgn: '', onLoad }));
    expect(onLoad).toHaveBeenCalledWith({ fen: 'abc', pgn: null });
  });

  it('calls onLoad with pgn param', () => {
    mockSearchParams((key) => (key === 'pgn' ? '1.e4' : null));
    renderHook(() => useShare({ fen: 'f', pgn: '', onLoad }));
    expect(onLoad).toHaveBeenCalledWith({ fen: null, pgn: '1.e4' });
  });

  it('calls onLoad with empty params', () => {
    mockSearchParams(() => null);
    renderHook(() => useShare({ fen: 'f', pgn: '', onLoad }));
    expect(onLoad).toHaveBeenCalledWith({ fen: null, pgn: null });
  });

  it('copyShareLink builds URL with fen when pgn is empty', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    mockSearchParams(() => null);

    const { result } = renderHook(() =>
      useShare({ fen: 'rnbq', pgn: '', onLoad })
    );
    await act(async () => result.current.copyShareLink());
    expect(writeText).toHaveBeenCalled();
  });

  it('copyShareLink builds URL with pgn when available', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    mockSearchParams(() => null);

    const { result } = renderHook(() =>
      useShare({ fen: 'f', pgn: '1. e4', onLoad })
    );
    await act(async () => result.current.copyShareLink());
    expect(writeText).toHaveBeenCalled();
  });

  it('falls back to prompt when clipboard fails', async () => {
    const promptFn = jest.fn();
    window.prompt = promptFn;
    const writeText = jest.fn().mockRejectedValue(new Error());
    Object.assign(navigator, { clipboard: { writeText } });
    mockSearchParams(() => null);

    const { result } = renderHook(() =>
      useShare({ fen: 'rnbq', pgn: '', onLoad })
    );
    await act(async () => result.current.copyShareLink());
    expect(promptFn).toHaveBeenCalled();
  });
});
