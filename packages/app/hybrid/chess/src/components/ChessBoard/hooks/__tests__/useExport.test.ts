import { act, renderHook } from '@testing-library/react';
import { createGame } from '@chess/ts';
import { download } from '../../../../utils/canvas';
import { downloadGIF } from '../../utils/eco';
import { useExport } from '../useExport';

jest.mock('html2canvas-pro', () =>
  jest.fn().mockResolvedValue({ toDataURL: () => 'data:image/png;base64,x' })
);

jest.mock('../../../../utils/canvas', () => ({
  download: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../utils/eco', () => ({
  downloadGIF: jest.fn().mockResolvedValue(undefined),
}));
const makeDeps = (overrides: Partial<Record<string, unknown>> = {}) => {
  const dispatch = jest.fn();
  const gameRef = { current: createGame() };
  const boardRef = { current: document.createElement('div') };
  return {
    pgn: '',
    boardRef,
    gameRef,
    dispatch,
    ...overrides,
  };
};

describe('useExport', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exposes export handlers', () => {
    const { result } = renderHook(() => useExport(makeDeps()));
    expect(typeof result.current.exportPNG).toBe('function');
    expect(typeof result.current.exportGIF).toBe('function');
  });

  it('exportPNG calls download', async () => {
    const { result } = renderHook(() => useExport(makeDeps()));
    await act(async () => {
      await result.current.exportPNG();
    });
    expect(download).toHaveBeenCalled();
  });

  it('exportGIF no-ops without a pgn', async () => {
    const { result } = renderHook(() => useExport(makeDeps()));
    await act(async () => {
      await result.current.exportGIF();
    });
    expect(downloadGIF).not.toHaveBeenCalled();
  });

  it('exportGIF captures frames and downloads when pgn present', async () => {
    const { result } = renderHook(() =>
      useExport(makeDeps({ pgn: '1. e4 e5 2. Nf3' }))
    );
    await act(async () => {
      await result.current.exportGIF();
    });
    expect(downloadGIF).toHaveBeenCalled();
  });

  it('exportGIF toggles gif loading state', async () => {
    const dispatch = jest.fn();
    const { result } = renderHook(() =>
      useExport(makeDeps({ pgn: '1. e4', dispatch }))
    );
    await act(async () => {
      await result.current.exportGIF();
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_GIF_LOADING',
      gifLoading: true,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_GIF_LOADING',
      gifLoading: false,
    });
  });
});
